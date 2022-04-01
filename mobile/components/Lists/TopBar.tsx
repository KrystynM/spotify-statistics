import React, { useEffect, useState } from "react";
import { View, Text } from "../Themed";
import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
};

export default function TopBar(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setTimeRange("short_term")}
      >
        <Text
          style={[
            styles.text,
            props.timeRange == "short_term"
              ? { color: Colors.neutral.accentColor }
              : null,
          ]}
        >
          Last 4 weeks
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setTimeRange("medium_term")}
      >
        <Text
          style={[
            styles.text,
            props.timeRange == "medium_term"
              ? { color: Colors.neutral.accentColor }
              : null,
          ]}
        >
          Last 3 months
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setTimeRange("long_term")}
      >
        <Text
          style={[
            styles.text,
            props.timeRange == "long_term"
              ? { color: Colors.neutral.accentColor }
              : null,
          ]}
        >
          Several years
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 14,
  },
});
