import { useLayoutEffect, useEffect, useContext, useRef } from "react";
import SocketContext from "../../../contexts/socket/SocketContext";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import Message from "./Message";
import { addNewMessage } from "../conversationSlice";

const MessageList = () => {
  const { socket } = useContext(SocketContext);
  const { messages } = useAppSelector((state) => state.conversation);
  const { latest, old } = messages;
  const dispatch = useAppDisptach();
  const listRef = useRef<HTMLDivElement>(null);

  console.log(latest, old);

  const scrollToBottom = () => {
    console.log(this);
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
    });
  };

  useLayoutEffect(() => {
    listRef.current?.scroll(0, listRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.on("get-new-message", (newMessage) => {
      dispatch(addNewMessage(newMessage));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        onLoad={scrollToBottom}
        ref={listRef}
        style={{
          height: 250,
          maxHeight: 250,
          padding: 15,
          overflowY: "scroll",
        }}
      >
        {[...old, ...latest].map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </>
  );
};

export default MessageList;
