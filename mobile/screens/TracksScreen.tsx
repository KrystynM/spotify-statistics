import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import List from "../components/Lists/TracksList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "../components/Lists/TopBar";
import Loader from "../components/Loader";

interface TopItem {
  id: number;
  name: string;
  imageUrl: string;
  popularity: number;
  artists: [];
}

export default function TracksScreen() {
  const [topItems, setTopItems] = useState(Array<TopItem>());
  const [timeRange, setTimeRange] = useState("medium_term");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        params: {
          limit: "25",
          time_range: timeRange,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let id = 1;
        const topItemsList = response.data.items.map((x: any) => {
          return {
            id: id++,
            name: x.name,
            imageUrl: x.album.images[2].url,
            popularity: x.popularity,
            artists: x.artists,
          };
        });
        setTopItems(topItemsList);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [timeRange]);

  function setRange(timeRange: string) {
    setLoader(true);
    setTimeRange(timeRange);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TopBar timeRange={timeRange} setTimeRange={setRange} />
      </View>
      <View style={styles.listContainer}>
        <Loader showLoader={loading} />
        <FlatList
          style={{ width: "100%" }}
          data={topItems}
          renderItem={({ item }) => <List track={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 12,
  },
});

