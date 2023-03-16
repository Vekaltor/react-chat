import { useEffect } from "react";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import FriendsList from "./components/FriendsList";
import { getFriends } from "./friendsSlice";

const Friends = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { friends } = useAppSelector((state) => state.friends);
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(getFriends(user?.id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h3>Friends:</h3>
      {friends.length ? <FriendsList /> : null}
    </div>
  );
};

export default Friends;
