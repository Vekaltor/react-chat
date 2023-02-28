import axios, { Axios } from "axios";
import { backendURL } from "../config/server";
import { IRegisterResponse } from "../types/responses";
import { RegisterElements } from "../types/forms";

class AuthService extends Axios {
  public async register(body: RegisterElements) {
    return await axios
      .post<IRegisterResponse>(`${backendURL}/api/register`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
  }
}

export default AuthService;
