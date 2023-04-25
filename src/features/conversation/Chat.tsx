import { useEffect, useContext } from "react";
import SocketContext from "../../contexts/socket/SocketContext";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import TitleChat from "./components/TitleChat";
import PanelMessages from "./components/PanelMessages";
import { getConversation } from "./conversationSlice";

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useAppSelector((state) => state.auth);
  const { _id, conversation_name, idSelectedConversation } = useAppSelector(
    (state) => state.conversation
  );
  const dispatch = useAppDisptach();

  const connectToConversation = () => {
    socket.emit("join-to-conversation", {
      conversationId: _id,
      userId: user?.id,
    });
  };

  const leaveConversation = () => {
    socket.emit("leave-from-conversation", idSelectedConversation);
  };

  const handleGetConversation = () => {
    console.log(idSelectedConversation);
    if (idSelectedConversation)
      dispatch(getConversation(idSelectedConversation));
  };

  useEffect(() => {
    handleGetConversation();
    if (socket) {
      connectToConversation();
      return () => {
        leaveConversation();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSelectedConversation]);

  return (
    <div style={{ width: 300, height: "auto", border: "1px solid black" }}>
      <TitleChat name={conversation_name} />
      <PanelMessages />
    </div>
  );
};

export default Chat;
