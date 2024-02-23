import type { Socket } from "socket.io-client";
import { AuthSocketEvents } from "../types/authSocketEvents";
import ConversationSocketService from "../features/conversation/services/conversationSocketService";

class AuthSocketService {
  private socket: Socket;
  private conversationSocketService: ConversationSocketService;

  constructor(socket: Socket) {
    this.socket = socket;
    this.conversationSocketService = new ConversationSocketService(socket);
  }

  public senders = {
    logout: (userId: string): void => {
      this.socket.emit(AuthSocketEvents.USER_OFFLINE, userId);
    },
    login: (userId: string): void => {
      this.socket.emit(AuthSocketEvents.USER_ONLINE, userId);
    },
  };

  public connect = (userId: string) => {
    this.socket.connect();
    this.socket.emit("user-connected", userId);
  };

  public disconnect = () => {
    // this.conversationSocketService();
    this.socket.disconnect();
  };
}

export default AuthSocketService;
