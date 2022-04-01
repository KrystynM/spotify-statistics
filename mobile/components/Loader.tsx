import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

type Props = {
  showLoader: boolean;
};

export default function Loader(props: Props) {
  if (props.showLoader) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.neutral.accentColor}
        animating={true}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
