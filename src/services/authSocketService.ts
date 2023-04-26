import type { Socket } from "socket.io-client";
import { AuthSocketEvents } from "../types/authSocketEvents";

class AuthSocketService {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public senders = {
    userOffline: (): void => {
      this.socket.emit(AuthSocketEvents.USER_OFFLINE);
    },
    userOnline: (userId: string): void => {
      this.socket.emit(AuthSocketEvents.USER_ONLINE, userId);
    },
  };
}

export default AuthSocketService;
