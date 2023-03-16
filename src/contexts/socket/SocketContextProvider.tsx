import { Socket } from "socket.io-client";
import { defaultOpts } from "../../config/socket.config";
import useSocket from "../../hooks/useSocket";
import SocketContext from "./SocketContext";

interface ISocketContextProviderProps {
  children: React.ReactNode;
}

const SocketContextProvider = (props: ISocketContextProviderProps) => {
  const socket: Socket = useSocket(defaultOpts);
  const socketContext = {
    socket: socket,
    uid: "",
    users: [],
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
