import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterElements } from "./types/forms";
import AuthService from "./services/authService";
import { IRegisterError } from "./types/errors";
import { AxiosError } from "axios";
import { createNotification } from "./features/notification/notificationSlice";
import { IRegisterResponse } from "./types/responses";

interface AuthState {
  loading: boolean;
  message: string;
}

const initialState: AuthState = {
  loading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<IRegisterResponse>) => {
        state.loading = false;
        state.message = payload.message;
      }
    );
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  RegisterElements,
  {
    rejectValue: IRegisterError;
  }
>("auth/register", async (body: RegisterElements, thunkAPI) => {
  let service = new AuthService();
  let response: IRegisterResponse = await service
    .register(body)
    .catch((err: AxiosError) => {
      const registerError = err.response?.data as IRegisterError;
      thunkAPI.dispatch(
        createNotification({
          type: "warning",
          message: registerError.error.message,
        })
      );
      throw thunkAPI.rejectWithValue(registerError);
    });
  thunkAPI.dispatch(
    createNotification({
      type: "success",
      message: response.message,
    })
  );
  return response;
});

export const loginUser = createAsyncThunk<
  IRegisterResponse,
  RegisterElements,
  {
    rejectValue: IRegisterError;
  }
>("auth/register", async (body: RegisterElements, thunkAPI) => {
  let service = new AuthService();
  let response: IRegisterResponse = await service
    .register(body)
    .catch((err: AxiosError) => {
      const registerError = err.response?.data as IRegisterError;
      thunkAPI.dispatch(
        createNotification({
          type: "warning",
          message: registerError.error.message,
        })
      );
      throw thunkAPI.rejectWithValue(registerError);
    });
  thunkAPI.dispatch(
    createNotification({
      type: "success",
      message: response.message,
    })
  );
  return response;
});

export default authSlice.reducer;
