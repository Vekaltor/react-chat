import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginElements, RegisterElements} from "./types/forms";
import AuthService from "./services/authService";
import {IInternalServerError, ILoginError, IRegisterError,} from "./types/errors";
import {AxiosError} from "axios";
import {createNotification} from "./features/notification/notificationSlice";
import {ILoginResponse, ILogoutResponse, IRegisterResponse,} from "./types/responses";
import {User} from "./types/models/User";
import {Cookies} from "react-cookie";

interface AuthState {
    isAuthorizated: boolean;
    user: User | undefined;
    loading: boolean;
    message: string;
}

const initialState: AuthState = {
    isAuthorizated: !!new Cookies().get("user"),
    user: new Cookies().get("user") || undefined,
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
            (state, {payload}: PayloadAction<IRegisterResponse>) => {
                state.loading = false;
                state.message = payload.message;
            }
        );
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthorizated = true;
            state.user = new Cookies().get("user");
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthorizated = false;
            state.user = undefined;
        });
        builder.addCase(logoutUser.rejected, (state) => {
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
            if (!err.response) {
                thunkAPI.dispatch(
                    createNotification({
                        type: "error",
                        message: "Upss something went wrong...",
                    })
                );
            }
            thunkAPI.dispatch(
                createNotification({
                    type: registerError.error.type,
                    message: registerError.error.message,
                    duration: 5000,
                })
            );
            throw thunkAPI.rejectWithValue(registerError);
        });
    thunkAPI.dispatch(
        createNotification({
            type: "success",
            message: response.message,
            duration: 10000,
        })
    );
    return response;
});

export const loginUser = createAsyncThunk<
    ILoginResponse,
    LoginElements,
    {
        rejectValue: ILoginError;
    }
>("auth/login", async (body: LoginElements, thunkAPI) => {
    let service = new AuthService();
    let response: ILoginResponse = await service
        .login(body)
        .catch((err: AxiosError) => {
            const loginError = err.response?.data as ILoginError;
            if (!err.response) {
                thunkAPI.dispatch(
                    createNotification({
                        type: "error",
                        message: "Upss something went wrong...",
                    })
                );
            }
            thunkAPI.dispatch(
                createNotification({
                    type: loginError.error.type,
                    message: loginError.error.message,
                })
            );
            throw thunkAPI.rejectWithValue(loginError);
        });
    return response;
});

export const logoutUser = createAsyncThunk<ILogoutResponse>(
    "auth/logout",
    async (__, thunkAPI) => {
        let service = new AuthService();
        return await service
            .logout()
            .catch((err: AxiosError) => {
                const logoutError = err.response?.data as IInternalServerError;
                thunkAPI.dispatch(
                    createNotification({
                        type: logoutError.error.type,
                        message: logoutError.error.message,
                    })
                );
                throw thunkAPI.rejectWithValue(logoutError);
            });
    }
);

export default authSlice.reducer;
