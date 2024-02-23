import { StatusFriend } from "../../../types/models/Friend";
import FriendStatus from "./FriendStatus";
import { StyledAvatar } from "./styles/Avatar.styled";
import { GoPerson } from "react-icons/go";

type AvatarProps = {
  img: string | undefined;
  status: StatusFriend;
};

const Avatar = ({ img, status }: AvatarProps) => {
  return (
    <StyledAvatar>
      {img ? <img src={img} alt={img} /> : <GoPerson />}
      <FriendStatus status={status} />
    </StyledAvatar>
  );
};

export default Avatar;
