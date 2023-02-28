import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";
import { IRegisterResponse } from "./types/responses";

interface AuthState {
  loading: boolean;
  error: string | undefined | null;
  message: string;
}

const initialState: AuthState = {
  loading: false,
  error: "",
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<IRegisterResponse>) => {
        console.log("fulfilled: ", payload);
        state.loading = false;
        state.message = payload.message;
      }
    );
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      console.log("rejected: ", payload);
      state.loading = false;
      state.error = payload?.error.message;
    });
  },
});

export { registerUser };

export default authSlice.reducer;
