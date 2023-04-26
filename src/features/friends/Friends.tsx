import { useEffect } from "react";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import FriendsList from "./components/FriendsList";
import { getFriends } from "./friendsSlice";
import useSocketService from "../../hooks/useSocketService";
import UserStatusSocketService from "./services/userStatusSocketService";

const Friends = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { friends } = useAppSelector((state) => state.friends);
  const dispatch = useAppDisptach();

  const [Service] = useSocketService(UserStatusSocketService);

  useEffect(() => {
    dispatch(getFriends(user?.id!));
    Service.listeners.getNotificationUnreadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 10, marginTop: 20 }}>
      <h3 style={{ marginBottom: 20 }}>Friends:</h3>
      {friends.length ? <FriendsList /> : null}
    </div>
  );
};

export default Friends;
