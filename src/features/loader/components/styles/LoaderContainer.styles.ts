import styled from "styled-components";

export type LoaderContainerCSS = {
  position?: string;
  background?: string;
};

export const StyledLoaderContainer = styled.div<LoaderContainerCSS>`
  position: ${({ position }) => (position ? position : "absolute")};
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ background }) => (background ? background : "transparent")};
  z-index: 1;
`;
