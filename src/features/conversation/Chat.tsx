import { useLayoutEffect } from "react";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import TitleChat from "./components/TitleChat";
import PanelMessages from "./components/PanelMessages";
import { getConversation } from "./conversationSlice";
import useSocketService from "../../hooks/useSocketService";
import ConversationSocketService from "./services/conversationSocketService";

const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { conversation_name, idSelectedConversation } = useAppSelector(
    (state) => state.conversation
  );
  const [Service, socket] = useSocketService(ConversationSocketService);
  const dispatch = useAppDisptach();

  const handleJoinToChat = () => {
    Service.senders.jointToChat(user?.id!, idSelectedConversation);
  };

  const handleLeaveFromChat = () => {
    Service.senders.leaveFromChat(idSelectedConversation);
  };

  const handleGetConversation = () => {
    if (idSelectedConversation)
      dispatch(getConversation(idSelectedConversation));
  };

  useLayoutEffect(() => {
    handleGetConversation();
    if (socket) {
      handleJoinToChat();
      return () => {
        handleLeaveFromChat();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSelectedConversation]);

  if (!idSelectedConversation) return null;

  return (
    <div style={{ width: 300, height: "auto", border: "1px solid black" }}>
      <TitleChat name={conversation_name} />
      <PanelMessages />
    </div>
  );
};

export default Chat;
