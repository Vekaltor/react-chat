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

const SocketContext: Context<ISocketContextState> =
  React.createContext<ISocketContextState>(defaultSocketContextState);

export default SocketContext;
