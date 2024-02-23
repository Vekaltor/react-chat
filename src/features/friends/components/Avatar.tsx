import {StatusFriend} from "../../../types/models/Friend";
import FriendStatus from "./FriendStatus";
import {AvatarSizes, StyledAvatar} from "./styles/Avatar.styled";
import {GoPerson} from "react-icons/go";

type AvatarProps = {
    img: string | undefined;
    status: StatusFriend;
    isActive?: boolean;
    size?: AvatarSizes;
};

const Avatar = ({img, status, isActive, size = "medium"}: AvatarProps) => {
    return (
        <StyledAvatar isActive={isActive || false} size={size}>
            {img ? <img src={img} alt={img}/> : <GoPerson/>}
            <FriendStatus status={status}/>
        </StyledAvatar>
    );
};

export default Avatar;
