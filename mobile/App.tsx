import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./redux/store";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import LoginScreen from "./screens/LoginScreen";
import axios from "axios";
import Loader from "./components/Loader";
import { refreshToken } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  const authState = useAppSelector((state) => state.auth.authState);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }, [accessToken]);

  axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status == 401) {
      dispatch(refreshToken());
      const accessToken = useAppSelector((state) => state.auth.accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return axios.request(error.config);
    }
    return error;
  });

  if (!isLoadingComplete || authState == "pending") {
    return (
      <SafeAreaProvider>
        <Loader showLoader={true} />
      </SafeAreaProvider>
    );
  } else if (authState == "authorized") {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    );
  }
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
