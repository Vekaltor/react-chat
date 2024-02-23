import WrapperBox from "../../../components/WrapperBox";
import { StyledWrapperFlexColumn } from "../../../components/styles/WrapperFlexColumn.styled";

const RightPanel = () => {
  return (
    <WrapperBox typeBg="bgThirdy" style={{ gridArea: "1 / 2 " }}>
      <StyledWrapperFlexColumn>Media</StyledWrapperFlexColumn>
    </WrapperBox>
  );
};

export default RightPanel;
