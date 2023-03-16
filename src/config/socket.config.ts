import { ManagerOptions, SocketOptions } from "socket.io-client";

export const defaultOpts: Partial<ManagerOptions & SocketOptions> | undefined =
  {
    autoConnect: false,
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    upgrade: false,
    reconnection: false,
    rejectUnauthorized: false,
  };
