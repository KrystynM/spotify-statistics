import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import List from "../components/Lists/ArtistsList";
import TopBar from "../components/Lists/TopBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

interface TopItem {
  id: number;
  name: string;
  imageUrl: string;
  popularity: number;
  followers: number;
}

export default function ArtistsScreen() {
  const [topItems, setTopItems] = useState(Array<TopItem>());
  const [timeRange, setTimeRange] = useState("medium_term");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
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
        let topItemsList: TopItem[] = [];
        let id = 1;
        for (let obj of response.data.items) {
          topItemsList.push({
            id: id++,
            name: obj.name,
            imageUrl: obj.images[2].url,
            popularity: obj.popularity,
            followers: obj.followers.total,
          });
        }
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
          renderItem={({ item }) => <List artist={item} />}
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
