import type {Socket} from "socket.io-client";
import {AuthSocketEvents} from "../types/authSocketEvents";
import ConversationSocketService from "../features/conversation/services/conversationSocketService";
import {ConversationId} from "../features/friends/types/types";

class AuthSocketService {
    private socket: Socket;
    private conversationSocketService: ConversationSocketService;

    constructor(socket: Socket) {
        this.socket = socket;
        this.conversationSocketService = new ConversationSocketService(socket);
    }

    public senders = {
        logout: (userId: string): void => {
            // this.beforeLogout(userId,[""],this.socket);
            this.socket.emit(AuthSocketEvents.USER_OFFLINE, userId);
        },
        login: (userId: string): void => {
            this.socket.emit(AuthSocketEvents.USER_ONLINE, userId);
            this.setup(userId);
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

    private setup(userId: string) {
        this.conversationSocketService.senders.checkNotifications(userId);
    }

    private beforeLogout(userId: string, socket: Socket, conversationsIds: Array<ConversationId>) {
        conversationsIds.forEach(convId => {
            this.conversationSocketService.senders.leaveFromChat(userId, convId, socket);
        })
    }
}

export default AuthSocketService;
