import { CSSProperties, TypeBgColor, TypeColor } from "styled-components";
import { StyledWrapperBox } from "./styles/WrapperBox.styled";

interface DefaultWrapper {
  typeBg: TypeBgColor;
  typeColor?: TypeColor;
  children?: React.ReactNode;
  style?: CSSProperties;
}

const WrapperBox: React.FC<DefaultWrapper> = (props) => {
  return <StyledWrapperBox {...props}>{props.children}</StyledWrapperBox>;
};

export default WrapperBox;
