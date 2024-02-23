import styled, { TypeBgColor, TypeColor } from "styled-components";

export const StyledWrapperBox = styled.div<{
  typeBg: TypeBgColor;
  typeColor?: TypeColor;
}>`
  background-color: ${({ typeBg, theme }) => theme[typeBg]};
  color: ${({ typeColor, theme }) =>
    typeColor ? theme[typeColor] : theme.colorPrimary};
`;
