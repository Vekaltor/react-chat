import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import SocketContext from "../../contexts/socket/SocketContext";

import Chat from "../../features/conversation/Chat";
import Friends from "../../features/friends/Friends";
import { logoutUser } from "../../authSlice";

const Profile = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useAppSelector((state) => state.auth);
  const history = useNavigate();
  const dispatch = useAppDisptach();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    socket.emit("user-offline");
    history("/login");
  };

  useEffect(() => {
    socket.connect();
    socket.emit("user-online", user?.id);
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Profile: {user?.name}</h3>
          <br></br>
          <Chat />
          <br></br>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
        <div
          style={{
            borderRight: "2px solid black",
            width: "25%",
          }}
        >
          <Friends />
        </div>
      </div>
    </>
  );
};

export default Profile;
