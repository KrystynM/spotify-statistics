import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { grantCode } from "../redux/authSlice";
import Button from "../components/Button";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function LoginScreen() {
  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: "f34fc6873a8a42e6a2355391c00f0a8c",
      scopes: ["user-top-read"],
      usePKCE: false,
      redirectUri: "exp://192.168.1.11:19000/",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const code = response.params.code;
      dispatch(grantCode(code));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        To use application you have to login to your Spotify account
      </Text>
      <Button onPress={() => promptAsync()} title="Open Browser" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 10,
  },
});
