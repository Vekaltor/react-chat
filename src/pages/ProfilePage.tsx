import SocketsProvider from "../contexts/socket/SocketContextProvider";
import Profile from "../views/profile/Profile";
import {ActiveViewProvider} from "../contexts/ActiveViewContext";

const ProfilePage = () => {
  return (
    <SocketsProvider>
        <ActiveViewProvider>
            <Profile />
        </ActiveViewProvider>
    </SocketsProvider>
  );
};

export default ProfilePage;
