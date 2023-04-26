import { useContext } from "react";
import SocketContext from "../contexts/socket/SocketContext";
import type { Socket } from "socket.io-client";

const useSocketService = <C>(socketService: {
  new (arg: Socket): C;
}): [C, Socket] => {
  const { socket } = useContext(SocketContext);
  const instanceSocketService: C = new socketService(socket);

  return [instanceSocketService, socket];
};

export default useSocketService;
