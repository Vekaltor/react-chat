import WrapperBox from "../../../components/WrapperBox";
import ChatFeatures from "./ChatFeatures";
import ChatReceiver from "./ChatReceiver";

const HeaderChat = () => {

    return (
        <WrapperBox
            typeBg="bgTransparent"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #e0e0e0",
                minHeight: "60px",
            }}
        >
            <ChatReceiver/>
            <ChatFeatures/>
        </WrapperBox>
    );
};

export default HeaderChat;
