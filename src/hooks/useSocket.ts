import { useEffect, useRef } from "react";
import io, { ManagerOptions, SocketOptions, Socket } from "socket.io-client";
import { backendWsURL } from "../config/server";

const URL = process.env.NODE_ENV === "production" ? "" : backendWsURL;

const useSocket = (
  opts?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket => {
  const { current: socket } = useRef(io(URL, opts));

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
