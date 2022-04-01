import { Image } from "react-native";
import { Text, View } from '../Themed';
import listStyles from "./ListStyles";
import { default as NumberFormat } from 'react-number-format';

interface Artist {
  id: number
  name: string
  imageUrl: string
  popularity: number
  followers: number
}

type Props = {
  artist: Artist
}

export default function ArtistItem({artist}: Props ) {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.lefContainer}>
        <Image source={{ uri: artist.imageUrl }} style={listStyles.image}/>

        <View style={listStyles.midContainer}>
          <View style={listStyles.nameContainer}>
            <Text style={listStyles.name}>{artist.id}. </Text>
            <Text style={listStyles.name}>{artist.name}</Text>
          </View>
          <View style={listStyles.statisticContainer}>
            <Text style={listStyles.statisticTitle}>Popularity: </Text>
            <NumberFormat
              value={artist.popularity}
              displayType={'text'}
              thousandSeparator={true}
              renderText={formattedValue =><Text style={listStyles.statisticValue}>{formattedValue}</Text>}
            />
            <Text style={listStyles.statisticTitle}>Followers: </Text>
            <NumberFormat
              value={artist.followers}
              displayType={'text'}
              thousandSeparator={true}
              renderText={formattedValue =><Text style={listStyles.statisticValue}>{formattedValue}</Text>}
            />
          </View>
        </View>
      </View>
      <View style={listStyles.rightContainer}>
      </View>
    </View>
  );
}
