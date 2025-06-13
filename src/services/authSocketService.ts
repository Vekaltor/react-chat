import {Socket} from "socket.io-client";
import {ShortUser} from "../types/models/User";
import {AuthSocketEvents} from "../types/authSocketEvents";
import ConversationSocketService from "../features/conversation/services/conversationSocketService";

class AuthSocketService {
    private socket: Socket | null = null;
    private conversationSocketService: ConversationSocketService | null = null;

    constructor(socket: Socket) {
        this.socket = socket;
        this.conversationSocketService = new ConversationSocketService(socket);
    }

    get senders() {
        return {
            logout: (userId: string): void => {
                this.socket?.emit(AuthSocketEvents.USER_OFFLINE, userId);
            },
            login: (userId: string): void => {
                this.socket?.emit(AuthSocketEvents.USER_ONLINE, userId);
                this.setup(userId);
            },
            getAllUsers: () => {
                this.socket?.emit("getAllUsers");
            },
            sendFriendRequest: (fromUserId: string, toUserId: string) => {
                this.socket?.emit("sendFriendRequest", {fromUserId, toUserId});
            }
        };
    }

    public connect = (userId: string) => {
        this.socket?.connect();
        this.socket?.emit("user-connected", userId);
    };

    public disconnect = () => {
        this.socket?.disconnect();
        this.socket = null;
        this.conversationSocketService = null;
    };

    private setup(userId: string) {
        this.socket?.on("user-connected", (socketId: string) => {
            console.log("User connected", socketId);
        });

        this.socket?.on("user-disconnected", (socketId: string) => {
            console.log("User disconnected", socketId);
        });
    }

    get listeners() {
        return {
            getUsers: (callback: (users: ShortUser[]) => void) => {
                this.socket?.on("getUsers", callback);
            }
        };
    }

    offListener(event: string) {
        this.socket?.off(event);
    }
}

export default AuthSocketService;
