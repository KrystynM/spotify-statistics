import { StyleSheet } from "react-native";

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  lefContainer: {
    flexDirection: "row",
    paddingLeft: 4,
  },
  midContainer: {
    justifyContent: "space-around",
    marginLeft: 2,
  },
  rightContainer: {
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 7,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 4,
  },
  statisticContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
  statisticTitle: {
    fontSize: 12,
    color: "dimgrey",
  },
  statisticValue: {
    fontSize: 12,
    marginRight: 4,
    color: "dimgrey",
  },
  number: {
    fontSize: 20,
  },
});

export default listStyles
