import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  Friend as FriendProps,
  StatusFriend,
} from "../../../types/models/Friend";
import FriendStatus from "./FriendStatus";

const Friend = (props: FriendProps) => {
  const { onlineFriends } = useAppSelector((state) => state.friends);
  const { _id, name, surname, photo } = props;

  const checkStatus = (): StatusFriend => {
    if (onlineFriends.includes(_id)) return "online";
    return "offline";
  };

  return (
    <li>
      <FriendStatus status={checkStatus()} />
      <span>
        {name} {surname}
      </span>
    </li>
  );
};

export default Friend;
