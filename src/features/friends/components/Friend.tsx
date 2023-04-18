import { FriendWithStatus as FriendProps } from "../../../types/models/Friend";
import FriendStatus from "./FriendStatus";

const Friend = (props: FriendProps) => {
  const { status, friend } = props;
  const { _id, name, surname, photo } = friend;

  return (
    <li style={{ display: "flex" }}>
      <FriendStatus status={status} />
      <span style={{ fontSize: 15, margin: "0 0 10px 20px" }}>
        {name} {surname}
      </span>
    </li>
  );
};

export default Friend;
