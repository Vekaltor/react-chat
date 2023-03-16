type FriendStatusProps = {
  status: "online" | "offline";
};

const FriendStatus = ({ status }: FriendStatusProps) => {
  return (
    <span>
      <span>{status} </span>
    </span>
  );
};

export default FriendStatus;
