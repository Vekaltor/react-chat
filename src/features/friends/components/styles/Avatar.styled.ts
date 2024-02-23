import styled from "styled-components";

interface StyledWrapperAvatarProps {
    isActive: boolean;
    size: AvatarSizes
}

export type AvatarSizes = "verySmall" | "small" | "medium" | "large";

export enum AvatarSizesEnum {
    VERY_SMALL = "verySmall",
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

const avatarSizeMap = {
    [AvatarSizesEnum.VERY_SMALL]: "15px",
    [AvatarSizesEnum.SMALL]: "30px",
    [AvatarSizesEnum.MEDIUM]: "50px",
    [AvatarSizesEnum.LARGE]: "70px",
};

export const StyledAvatar = styled.div<StyledWrapperAvatarProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => avatarSizeMap[props.size]};
  min-width: ${props => avatarSizeMap[props.size]};
  height: ${props => avatarSizeMap[props.size]};
  border-radius: 50%;
  box-shadow: ${props =>
          props.isActive ? `0px 0px 10px 5px var(--lightPourple)` : "none"};

  & svg {
    width: 100%;
    height: 100%;
    background-color: #fee;
    color: grey;
    font-size: 3.5em;
    border-radius: 50%;

    & path {
      transform: translate(0px, 2px);
    }
  }
`;
