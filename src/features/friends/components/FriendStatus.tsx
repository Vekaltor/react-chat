import { StyledOffline } from "./styles/Offline.style";
import { StyledOnline } from "./styles/Online.style";

type FriendStatusProps = {
  status: "online" | "offline";
};

const FriendStatus = ({ status }: FriendStatusProps) => {
  const offline = <StyledOffline />;
  const online = <StyledOnline />;
  return status === "online" ? online : offline;
};

export default FriendStatus;
