import { useContext, useState } from "react";
import SocketContext from "../../../contexts/socket/SocketContext";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { addNewMessage } from "../conversationSlice";
import { IMessage } from "../../../types/responses";

type ButtonSenderProps = {
  conversationId: string;
  userId: string;
};

const ButtonSender = (props: ButtonSenderProps) => {
  const { socket } = useContext(SocketContext);
  const { conversationId, userId } = props;
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDisptach();

  const handleClick = () => {
    const newMessage: IMessage = {
      from_id_user: userId,
      message_text: message,
      created_at: new Date().toISOString(),
    };
    socket.emit("send-new-message", {
      message: newMessage,
      conversationId: conversationId,
    });

    dispatch(addNewMessage(newMessage));
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} value={message} />
      <button
        onClick={handleClick}
        style={{
          background: "#333",
          color: "#EEE",
          padding: "3px 30px",
          marginLeft: 1,
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ButtonSender;
