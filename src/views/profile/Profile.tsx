import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDisptach } from "../../hooks/useAppDisptach";

import Chat from "../../features/conversation/Chat";
import Friends from "../../features/friends/Friends";
import { logoutUser } from "../../authSlice";
import useSocketService from "../../hooks/useSocketService";
import AuthSocketService from "../../services/authSocketService";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [Service, socket] = useSocketService(AuthSocketService);
  const history = useNavigate();
  const dispatch = useAppDisptach();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    Service.senders.userOffline();
    history("/login");
  };

  useEffect(() => {
    socket.connect();
    Service.senders.userOnline(user?.id!);
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
