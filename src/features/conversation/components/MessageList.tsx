import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector";
import Message from "./Message";
import {IMessage} from "../../../types/responses";
import useSocketService from "../../../hooks/useSocketService";
import ConversationSocketService from "../services/conversationSocketService";
import {ConversationEvents} from "../types/conversationSocketEvents";
import ScrollToBottomChat from "./ScrollToBottomChat";

const MessageList = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [conversationSocketService] = useSocketService(ConversationSocketService);
    const {current, idSelectedConversation} = useAppSelector(
        (state) => state.conversation
    );
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const {messages} = current;
    const {latest, old} = messages;

    const scrollToBottom = () => {
        listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    const scrollToBottomInstant = () => {
        listRef.current?.scrollTo(0, listRef.current.scrollHeight);
    };

    const handleScroll = () => {
        const maxScroll = listRef?.current!.scrollHeight - listRef?.current!.clientHeight;
        const currentScroll = listRef?.current!.scrollTop;
        const threshold = 100;

        if (maxScroll - currentScroll > threshold) {
            setShowScrollToBottom(true);
        } else {
            setShowScrollToBottom(false);
        }
    };

    useLayoutEffect(() => {
        scrollToBottomInstant();
    }, [messages]);

    useEffect(() => {
        const list = listRef?.current!;
        list.addEventListener('scroll', handleScroll);

        return () => list.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        conversationSocketService.listeners.getMessage(idSelectedConversation);
        return () => {
            conversationSocketService.offListener(ConversationEvents.GET_NEW_MESSAGE);
        };
    }, [idSelectedConversation]);

    return (
        <div style={{position: "relative", overflowY: "hidden", height: "100%"}}>
            <div
                onLoad={scrollToBottomInstant}
                ref={listRef}
                style={{
                    height: "inherit",
                    padding: 15,
                    overflowY: "scroll",
                    scrollbarColor: "#f23",
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
            {showScrollToBottom && <ScrollToBottomChat click={scrollToBottom} />}
        </div>
    );
};

export default MessageList;


// *::-webkit-scrollbar {
//   width: 16px;
// }

// *::-webkit-scrollbar-track {
//   background: #ffffff;
// }

// *::-webkit-scrollbar-thumb {
//   background-color: #d6d6d6;
//   border-radius: 10px;
//   border: 3px solid #ffffff;
// }
