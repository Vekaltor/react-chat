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
    history("/login");
  };

  useEffect(() => {
    socket.connect();
    socket.emit("login", user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h3>Profile ID: {user?.id}</h3>
        <br></br>
        <Chat />
        <br></br>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div>
        <Friends />
      </div>
    </>
  );
};

export default Profile;
