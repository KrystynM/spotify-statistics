import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-simple-toast";

const authUrl = "http://10.0.2.2:5001";

export interface AuthState {
  code: string;
  accessToken: string;
  refreshToken: string;
  authState: string;
}

const initialState: AuthState = {
  code: "",
  accessToken: "",
  refreshToken: "",
  authState: "pending",
};

export const grantCode = createAsyncThunk("grantCode", async (code: string) => {
  let data = { accessToken: "", refreshToken: "", authState: "unauthorized" };
  await axios
    .post(authUrl + "/callback", { code })
    .then((response) => {
      data = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        authState: "authorized",
      };
    })
    .catch(() => {
      Toast.show("Error while login");
    });
  await SecureStore.setItemAsync("refreshToken", data.refreshToken);
  return data;
});

export const refreshToken = createAsyncThunk("refreshToken", async () => {
  let data = { accessToken: "", authState: "unauthorized" };
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (!refreshToken || refreshToken == "") return data;

  await axios
    .post(authUrl + "/refresh", { refreshToken })
    .then((response) => {
      data = {
        accessToken: response.data.accessToken,
        authState: "authorized",
      };
    })
    .catch((error) => {
      Toast.show("Error");
      console.log(error);
    });
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(grantCode.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.authState = payload.authState;
    });

    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.authState = payload.authState;
    });
  },
});

export const { setCode, setToken } = authSlice.actions;

export default authSlice.reducer
