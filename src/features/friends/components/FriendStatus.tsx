import {StyledStatus} from "./styles/Status.styled";

type FriendStatusProps = {
    status: "online" | "offline";
};

const FriendStatus = ({status}: FriendStatusProps) => {
    return <StyledStatus status={status}/>;
};

export default FriendStatus;
