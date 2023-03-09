import styled, { keyframes } from "styled-components";
import { WheelSpinerCssProps } from "../WheelSpinner";

const rotate = keyframes`
  100%   {transform: rotate(360deg)}
`;
const prixClipFix = keyframes` 
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
`;

export const StyledWheelSpinner = styled.div<WheelSpinerCssProps>`
  width: ${({ size }) => (size ? size : "46px")};
  height: ${({ size }) => (size ? size : "46px")};
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;
  z-index: 3;
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: ${({ borderSize }) => (borderSize ? borderSize : "5px")} solid
      ${({ color }) => (color ? color : "#fff")};
    animation: ${prixClipFix} 2s linear infinite;
  }
`;
