import type { Socket } from "socket.io-client";
import { IMessage } from "../../../types/responses";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { addNewMessage } from "../conversationSlice";
import { ConversationEvents } from "../types/conversationSocketEvents";

class ConversationSocketService {
  private socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  private dispatch = useAppDisptach();

  public listeners = {
    getMessage: (): void => {
      this.socket.on(
        ConversationEvents.GET_NEW_MESSAGE,
        (newMessage: IMessage) => {
          this.dispatch(addNewMessage(newMessage));
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
    leaveFromChat: (conversationId: string): void => {
      this.socket.emit(
        ConversationEvents.LEAVE_FROM_CONVERSATION,
        conversationId
      );
    },
    sendMessage: (message: IMessage, conversationId: string): void => {
      this.socket.emit(ConversationEvents.SEND_NEW_MESSAGE, {
        message,
        conversationId,
      });
    },
  };
}

export default ConversationSocketService;
