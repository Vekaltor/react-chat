import React, { Context } from "react";
import io, { Socket } from "socket.io-client";

export interface ISocketContextState {
  socket: Socket;
  uid: string;
  users: string[];
}

export const defaultSocketContextState: ISocketContextState = {
  socket: io(),
  uid: "",
  users: [],
};

// export type TSocketContextActions =
//   | "update_socket"
//   | "update_uid"
//   | "update_users"
//   | "remove_user";

// export type TSocketContextPayload = string | string[] | Socket;

// export interface ISocketContextActions {
//   type: TSocketContextActions;
//   payload: TSocketContextPayload;
// }

const SocketContext: Context<ISocketContextState> =
  React.createContext<ISocketContextState>(defaultSocketContextState);

export default SocketContext;
