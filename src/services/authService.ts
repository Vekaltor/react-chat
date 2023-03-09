import axios, { Axios } from "axios";
import { backendURL } from "../config/server";
import {
  IActivateAccResponse,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
} from "../types/responses";
import { LoginElements, RegisterElements } from "../types/forms";
import { IActivateAccParams } from "../types/params";

class AuthService extends Axios {
  public async register(body: RegisterElements) {
    return await axios
      .post<IRegisterResponse>(`${backendURL}/register`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
  }

  public async login(body: LoginElements) {
    return await axios
      .post<ILoginResponse>(`${backendURL}/login`, body, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
      })
      .then((res) => res.data);
  }

  public async activate(params: IActivateAccParams) {
    const { id, token } = params;
    return await axios
      .get<IActivateAccResponse>(`${backendURL}/activate/${id}/${token}`, {})
      .then((res) => res.data);
  }

  public async logout() {
    return await axios
      .get<ILogoutResponse>(`${backendURL}/logout`, {
        withCredentials: true,
      })
      .then((res) => res.data);
  }
}

export default AuthService;
