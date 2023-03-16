import { useContext, useEffect } from "react";
import SocketContext from "../../../contexts/socket/SocketContext";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FriendId } from "../../../types/models/Friend";
import { SocketUser } from "../../../types/models/User";
import { setFriendsOnline } from "../friendsSlice";
import Friend from "./Friend";

const FriendsList = () => {
  const { socket } = useContext(SocketContext);
  const { friends } = useAppSelector((state) => state.friends);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisptach();

  const checkFriendsOnline = (onlineUsers: Array<SocketUser>) => {
    let friendsOnline: Array<FriendId> = [];
    onlineUsers.forEach((onlineUser: SocketUser) => {
      if (isFriend(onlineUser.userId)) friendsOnline.push(onlineUser.userId);
    });
    dispatch(setFriendsOnline(friendsOnline));
  };

  const isFriend = (idUser: string) => {
    return friends.find((friend) => friend._id === idUser) ? true : false;
  };

  const ListOfFriends = friends.map((friend) => (
    <Friend key={friend._id} {...friend} />
  ));

  useEffect(() => {
    socket.on("get-users", (onlineUsers: Array<SocketUser>) => {
      checkFriendsOnline(onlineUsers);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ul>{ListOfFriends}</ul>
    </>
  );
};

export default FriendsList;
