import axios from "axios";
import {backendURL} from "../config/server";
import {IFriendsResponse} from "../types/responses";
import {ShortUser} from "../types/models/User";
import {ReceivedInvite, SentInvite} from "../types/models/Friend";

class FriendsService {
    async fetchFriends(): Promise<IFriendsResponse> {
        const response = await axios.get<IFriendsResponse>(`${backendURL}/friends`, {
            withCredentials: true,
        })
        return response.data;
    }

    async getDiscoverableUsers(): Promise<ShortUser[]> {
        const response = await axios.get(`${backendURL}/friends/discover`, {
            withCredentials: true
        });
        return response.data.users;
    }

    async getSentInvites(): Promise<SentInvite[]> {
        const response = await axios.get(`${backendURL}/friends/sent-invites`, {
            withCredentials: true
        });
        return response.data.users;
    }

    async getReceivedInvites(): Promise<ReceivedInvite[]> {
        const response = await axios.get(`${backendURL}/friends/received-invites`, {
            withCredentials: true
        });
        return response.data.users;
    }

    async sendInvite(userId: string): Promise<void> {
        await axios.post(`${backendURL}/friends/invite/${userId}`, {}, {
            withCredentials: true
        });
    }

    async acceptInvite(inviteId: string): Promise<void> {
        await axios.post(`${backendURL}/friends/accept/${inviteId}`, {}, {
            withCredentials: true
        });
    }

    async rejectInvite(inviteId: string): Promise<void> {
        await axios.post(`${backendURL}/friends/reject/${inviteId}`, {}, {
            withCredentials: true
        });
    }
}

export default FriendsService;
