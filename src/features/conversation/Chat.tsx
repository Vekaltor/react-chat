/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { destroyChat, getConversation } from "./conversationSlice";
import useSocketService from "../../hooks/useSocketService";
import ConversationSocketService from "./services/conversationSocketService";
import ChatContainer from "./components/ChatContainer";
import RightPanel from "./components/RightPanel";
import WrapperBox from "../../components/WrapperBox";

const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { current, idSelectedConversation } = useAppSelector(
    (state) => state.conversation
  );
  const [Service, socket] = useSocketService(ConversationSocketService);
  const dispatch = useAppDisptach();

  const handleJoinToChat = () => {
    if (idSelectedConversation) {
      Service.senders.jointToChat(user?.id!, idSelectedConversation);
    }
  };

  const handleLeaveFromChat = () => {
    if (idSelectedConversation) {
      Service.senders.leaveFromChat(user?.id!, idSelectedConversation, socket);
      dispatch(destroyChat());
    }
  };

  const handleGetConversation = () => {
    if (idSelectedConversation) {
      dispatch(getConversation(idSelectedConversation));
    }
  };

  const handleBeforeUnload = () => {
    const handleUnload = () => {
      handleLeaveFromChat();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  };

  useEffect(() => {
    handleGetConversation();
    if (socket) {
      handleJoinToChat();
      handleBeforeUnload();
      return () => {
        handleLeaveFromChat();
      };
    }
  }, [idSelectedConversation]);

  return current._id ? (
    <WrapperBox
      typeBg="bgTransparent"
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 2fr",
        gridColumnGap: "3px",
      }}
    >
      <ChatContainer />
      <RightPanel />
    </WrapperBox>
  ) : null;
};

export default Chat;
