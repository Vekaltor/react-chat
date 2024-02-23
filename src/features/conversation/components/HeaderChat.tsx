import WrapperBox from "../../../components/WrapperBox";
import ChatFeatures from "./ChatFeatures";
import ChatReceiver from "./ChatReceiver";

const HeaderChat = () => {
  return (
    <WrapperBox
      typeBg="bgSecondary"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px",
      }}
    >
      <ChatReceiver />
      <ChatFeatures />
    </WrapperBox>
  );
};

export default HeaderChat;
