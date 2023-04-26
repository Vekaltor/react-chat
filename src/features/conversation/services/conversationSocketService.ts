import type { Socket } from "socket.io-client";
import { IMessage } from "../../../types/responses";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { addNewMessage } from "../conversationSlice";
import { ConversationEvents } from "../types/conversationSocketEvents";

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
        ({ message, conversationId }) => {
          console.log(message);
          console.log(currentConversationId, conversationId);
          if (currentConversationId === conversationId) {
            this.dispatch(addNewMessage(message));
          } else {
          }
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
    leaveFromChat: (userId: string, conversationId: string): void => {
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
  };

  public offListener = (socketEvent: ConversationEvents) => {
    this.socket.off(socketEvent);
  };
}

export default ConversationSocketService;
