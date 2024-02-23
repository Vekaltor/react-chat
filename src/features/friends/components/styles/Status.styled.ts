import styled from "styled-components";
import { StatusFriend } from "../../../../types/models/Friend";

type StyledStatusProps = {
  status: StatusFriend;
};

export const StyledStatus = styled.div<StyledStatusProps>`
  display: block;
  position: absolute;
  bottom: -1px;
  right: 3px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: ${({ status }) =>
    status === "online" ? "3px solid var(--darkGrey)" : "none"};
  background-color: ${({ status }) =>
    status === "online" ? "var(--lightPourple)" : "transparent"};
`;
