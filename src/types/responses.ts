import { Friend } from "./models/Friend";
import { User } from "./models/User";

export interface IRegisterResponse {
  message: string;
}

export interface ILoginResponse {
  user: User;
  message: string;
  type: "warning" | "success" | "error" | "information" | null;
}

export interface IActivateAccResponse {
  message: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IFriendsResponse {
  friends: Array<Friend>;
}
