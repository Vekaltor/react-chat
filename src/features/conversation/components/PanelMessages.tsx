import WrapperBox from "../../../components/WrapperBox";
import { useAppSelector } from "../../../hooks/useAppSelector";
import SenderMessage from "../components/SenderMessage";
import MessageList from "./MessageList";
import {CSSProperties} from "react";

const style: CSSProperties ={
    display:"grid",
    gridTemplateColumns:"1fr",
    gridTemplateRows:"1fr auto",
    justifyContent:"space-between",
    overflow:"hidden",
    height:"100%",
}

const PanelMessages = () => {
  const { idSelectedConversation } = useAppSelector(
    (state) => state.conversation
  );
  const { user } = useAppSelector((state) => state.auth);

  return (
    <WrapperBox typeBg="bgSecondary" style={style}>
      <MessageList />
      <SenderMessage
        conversationId={idSelectedConversation}
        userId={user?.id!}
      />
    </WrapperBox>
  );
};

export default PanelMessages;
