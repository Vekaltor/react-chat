import { useAppSelector } from "../../../hooks/useAppSelector";
import SenderMessage from "../components/SenderMessage";
import MessageList from "./MessageList";

const PanelMessages = () => {
  const { _id } = useAppSelector((state) => state.conversation);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <MessageList />
      <SenderMessage conversationId={_id!} userId={user?.id!} />
    </>
  );
};

export default PanelMessages;
