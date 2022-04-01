import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

type Props = {
  title: string;
  onPress: () => void;
};

const Button = (props: Props) => {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: Colors.neutral.accentColor,
    borderRadius: 10,
    padding: 10,
  },
  appButtonText: {
    fontSize: 14,
    alignSelf: "center",
    color: "#fff",
  },
});

export default Button;
