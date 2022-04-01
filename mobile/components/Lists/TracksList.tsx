import { Image } from "react-native";
import { Text, View } from "../Themed";
import listStyles from "./ListStyles";

interface Track {
  id: number;
  name: string;
  imageUrl: string;
  popularity: number;
  artists: [];
}

type Props = {
  track: Track;
};

export default function TrackstItem({ track }: Props) {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.lefContainer}>
        <Image source={{ uri: track.imageUrl }} style={listStyles.image} />

        <View style={listStyles.midContainer}>
          <View style={listStyles.nameContainer}>
            <Text style={listStyles.name}>{track.id}. </Text>
            <Text style={listStyles.name}>{track.name}</Text>
          </View>
          <View style={listStyles.statisticContainer}>
            {track.artists.map(function (a: any) {
              return (
                <Text style={listStyles.statisticValue} key={a.id}>
                  {a.name}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
      <View style={listStyles.rightContainer}></View>
    </View>
  );
}
