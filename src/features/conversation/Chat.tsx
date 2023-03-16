import { useEffect, useContext } from "react";
import SocketContext from "../../contexts/socket/SocketContext";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisptach();

  // useEffect(() => {
  //   socket.connect();
  //   socket.emit("login", user?.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div style={{ width: 300, height: "auto", border: "1px solid black" }}>
      <div
        style={{
          background: "black",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        Chat box
      </div>
      <div style={{ height: 250, maxHeight: 250, padding: 15 }}>
        <div>dadadad</div>
      </div>
      <div>
        <input type="text" />
        <button
          style={{
            background: "#333",
            color: "#EEE",
            padding: "3px 30px",
            marginLeft: 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
