import { useContext, useEffect } from "react";
import SocketContext from "../../../contexts/socket/SocketContext";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Friend as TFriend, FriendId } from "../../../types/models/Friend";
import {
  setFriendsOnline,
  updateFriendsOffline,
  updateFriendsOnline,
} from "../friendsSlice";
import Friend from "./Friend";
import { isEmptyObject } from "../../../utils/isEmptyObject";
import { isEmptyArray } from "../../../utils/isEmptyArray";

const FriendsList = () => {
  const { socket } = useContext(SocketContext);
  const { friends, friendsWithStatus } = useAppSelector(
    (state) => state.friends
  );
  const dispatch = useAppDisptach();

  const isFriend = (idUser: string): boolean =>
    friends.find((friend) => friend._id === idUser) ? true : false;

  const getOnlyIds = (friendsList: Array<TFriend>): FriendId[] =>
    friendsList.map((friend) => friend._id);

  const ListOfFriends = friendsWithStatus.map(({ friend, status }) => (
    <Friend key={friend._id} friend={friend} status={status} />
  ));

  useEffect(() => {
    if (isEmptyArray(friends)) {
      const friendsIds = getOnlyIds(friends);

      socket.emit("get-online-friends", friendsIds);

      socket.on("online-friends", (friendsOnline: Array<FriendId>) => {
        dispatch(setFriendsOnline(friendsOnline));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendsWithStatus]);

  useEffect(() => {
    socket.on("friend-online", (friendId: FriendId) => {
      if (isFriend(friendId)) {
        dispatch(updateFriendsOnline(friendId));
      }
    });

    socket.on("friend-offline", (friendId: FriendId) => {
      if (isFriend(friendId)) {
        dispatch(updateFriendsOffline(friendId));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul>{ListOfFriends}</ul>
    </>
  );
};

export default FriendsList;
