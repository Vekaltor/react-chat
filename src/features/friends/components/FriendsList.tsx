import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Friend from "./Friend";
import { isEmptyArray } from "../../../utils/isEmptyArray";
import useSocketService from "../../../hooks/useSocketService";
import UserStatusSocketService from "../services/userStatusSocketService";

const FriendsList = () => {
  const { friends, friendsWithStatus } = useAppSelector(
    (state) => state.friends
  );
  const [Service] = useSocketService(UserStatusSocketService);

  const ListOfFriends = friendsWithStatus.map(({ friend, status }) => (
    <Friend key={friend._id} friend={friend} status={status} />
  ));

  useEffect(() => {
    if (isEmptyArray(friends)) {
      Service.senders.checkStatusFriends(friends);
      Service.listeners.getOnlineFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Service.listeners.friendOnline(friends);
    Service.listeners.friendOffline(friends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul>{ListOfFriends}</ul>
    </>
  );
};

export default FriendsList;
