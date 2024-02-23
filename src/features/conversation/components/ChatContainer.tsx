import WrapperBox from "../../../components/WrapperBox";
import PanelMessages from "./PanelMessages";
import HeaderChat from "./HeaderChat";

const ChatContainer = () => {
  return (
    <WrapperBox
      typeBg="bgTransparent"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr",
        gridTemplateRows: "1fr 9fr",
        gridRowGap: "3px",
      }}
    >
      <HeaderChat />
      <PanelMessages />
    </WrapperBox>
  );
};

export default ChatContainer;
