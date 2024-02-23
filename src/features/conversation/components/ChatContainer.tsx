import WrapperBox from "../../../components/WrapperBox";
import PanelMessages from "./PanelMessages";
import HeaderChat from "./HeaderChat";

const ChatContainer = () => {
    return (
        <WrapperBox
            typeBg="bgTransparent"
            style={{
                display: "flex",
                flexDirection: "column",
                height:"100vh"
            }}
        >
            <HeaderChat/>
            <PanelMessages/>
        </WrapperBox>
    );
};

export default ChatContainer;
