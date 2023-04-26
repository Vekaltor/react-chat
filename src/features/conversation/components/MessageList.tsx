import { useLayoutEffect, useEffect, useRef } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Message from "./Message";
import { IMessage } from "../../../types/responses";
import useSocketService from "../../../hooks/useSocketService";
import ConversationSocketService from "../services/conversationSocketService";
import { ConversationEvents } from "../types/conversationSocketEvents";

const MessageList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [Service] = useSocketService(ConversationSocketService);
  const { messages, idSelectedConversation } = useAppSelector(
    (state) => state.conversation
  );
  const { latest, old } = messages;

  const scrollToBottom = () => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
    });
  };

  useLayoutEffect(() => {
    listRef.current?.scroll(0, listRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    Service.listeners.getMessage(idSelectedConversation);
    return () => {
      Service.offListener(ConversationEvents.GET_NEW_MESSAGE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSelectedConversation]);
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
        {[...old, ...latest]
          .sort((m1: IMessage, m2: IMessage) => {
            if (m1.created_at > m2.created_at) return 1;
            else if (m1.created_at < m2.created_at) return -1;
            else return 0;
          })
          .map((message, index) => (
            <Message key={index} {...message} />
          ))}
      </div>
    </>
  );
};

export default MessageList;
