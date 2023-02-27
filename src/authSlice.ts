import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types/models/User";

interface AuthState {
  user: User | null;
  refreshToken: string | null;
  loading: boolean;
  error: string;
  success: boolean;
}

const initialState: AuthState = {
  user: null,
  refreshToken: null,
  loading: false,
  error: "",
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
