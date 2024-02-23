import type {Socket} from "socket.io-client";
import {IMessage} from "../../../types/responses";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {addNewMessage, setConversationAsUnread,} from "../conversationSlice";
import {ConversationEvents} from "../types/conversationSocketEvents";
import {UnreadConversation} from "../../friends/types/types";

class ConversationSocketService {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    private dispatch = useAppDisptach();

    public listeners = {
        getMessage: (currentConversationId: string): void => {
            this.socket.on(
                ConversationEvents.GET_NEW_MESSAGE,
                ({message, conversationId}) => {
                    console.log("getMessage");
                    if (currentConversationId === conversationId) {
                        this.dispatch(addNewMessage(message));
                    } else {
                        this.dispatch(setConversationAsUnread(conversationId));
                    }
                }
            );
        },
        getNotifications: () => {
            this.socket.on(
                ConversationEvents.GET_UNREAD_CONVERSATIONS,
                (conversation: UnreadConversation) => {
                    console.log("getNotifications", conversation);
                    if (conversation)
                        this.dispatch(setConversationAsUnread(conversation));
                }
            );
        },
        getAllUnreadConversations: () => {
            this.socket.on(
                ConversationEvents.GET_ALL_UNREAD_CONVERSATIONS,
                (unreadConversations: Array<UnreadConversation>) => {
                    console.log(unreadConversations);
                    if (unreadConversations.length > 0)
                        unreadConversations.forEach((conversation) => {
                            this.dispatch(setConversationAsUnread(conversation));
                        });
                }
            );
        },
    };

    public senders = {
        jointToChat: (userId: string, conversationId: string): void => {
            this.socket.emit(ConversationEvents.JOIN_TO_CONVERSATION, {
                conversationId,
                userId,
            });
        },
        leaveFromChat: (
            userId: string,
            conversationId: string,
            socket: Socket
        ): void => {
            console.log("socket leavefromchat", socket);
            this.socket.emit(ConversationEvents.LEAVE_FROM_CONVERSATION, {
                conversationId,
                userId,
            });
        },
        sendMessage: (message: IMessage, conversationId: string): void => {
            this.socket.emit(ConversationEvents.SEND_NEW_MESSAGE, {
                message,
                conversationId,
            });
        },
        checkNotifications: (userId: string) => {
            this.socket.emit(ConversationEvents.CHECK_UNREAD_CONVERSATIONS, userId);
        },
    };

    public offListener = (socketEvent: ConversationEvents) => {
        this.socket.off(socketEvent);
    };
}

export default ConversationSocketService;
