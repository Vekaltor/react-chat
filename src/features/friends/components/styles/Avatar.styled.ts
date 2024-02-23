import styled from "styled-components";

export const StyledAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  /* overflow: hidden; */

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
