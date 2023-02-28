import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterElements } from "./types/forms";
import AuthService from "./services/authService";
import { IRegisterError } from "./types/errors";
import { IRegisterResponse } from "./types/responses";
import { AxiosError } from "axios";

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  RegisterElements,
  {
    rejectValue: IRegisterError;
  }
>("auth/register", async (body: RegisterElements, { rejectWithValue }) => {
  let service = new AuthService();
  return await service.register(body).catch((err: AxiosError) => {
    const registerError = err.response?.data as IRegisterError;
    console.log(registerError);
    throw rejectWithValue(registerError);
  });
});
