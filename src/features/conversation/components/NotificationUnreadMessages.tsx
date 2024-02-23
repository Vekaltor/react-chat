import { useAppSelector } from "../../../hooks/useAppSelector";

type NotificationUnreadMessagesProps = {
  idConversation: string;
};

const NotificationUnreadMessages = (props: NotificationUnreadMessagesProps) => {
  const { unreadMessagesPerConversation } = useAppSelector(
    (state) => state.conversation
  );
  const { idConversation } = props;

  return (
    <span
      style={{
        color: "#eee",
        background: "red",
        borderRadius: "50%",
        height: "5px",
        width: "5px",
        padding: "10px",
        display: "flex",
        fontWeight: "bolder",
        fontSize: "12px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {unreadMessagesPerConversation[idConversation]}
    </span>
  );
};

export default NotificationUnreadMessages;
