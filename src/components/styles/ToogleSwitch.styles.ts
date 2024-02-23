import styled from "styled-components";

const CSSVariables = styled.var`
  --widthWrapper: 40px;
  --heightWrapper: 20px;
  --borderRadiusWrapper: 10px;
  --radiusRound: 12px;
  --marginRound: 5px;
`;

const WrapperSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: var(--widthWrapper);
  height: var(--heightWrapper);
  border-radius: var(--borderRadiusWrapper);
  background-color: ${({ theme }) => theme.colorPrimary};
`;

const SliderRound = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    margin-left: var(--marginRound);
    margin-right: var(--marginRound);
    width: var(--radiusRound);
    height: var(--radiusRound);
    transform: translateY(calc((var(--heightWrapper) - var(--radiusRound)) / 2));
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bgPrimary};
    transition: 0.2s;
  }
`;

const Input = styled.input`
  width: var(--widthWrapper);
  height: var(--heightWrapper);
  border-radius: var(--borderRadiusWrapper);
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:checked + ${SliderRound} {
    &::after {
      content: "";
      margin-left: calc(
        var(--widthWrapper) - var(--radiusRound) - var(--marginRound)
      );
    }
  }
`;

export const S = {
  Input,
  WrapperSwitch,
  SliderRound,
};

export default CSSVariables;
