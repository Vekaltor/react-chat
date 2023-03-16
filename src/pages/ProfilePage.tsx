import SocketsProvider from "../contexts/socket/SocketContextProvider";
import Profile from "../views/profile/Profile";

const ProfilePage = () => {
  return (
    <SocketsProvider>
      <Profile />
    </SocketsProvider>
  );
};

export default ProfilePage;
