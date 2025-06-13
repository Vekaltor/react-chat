import axios from "axios";
import {backendURL} from "../config/server";
import {IFriendsResponse} from "../types/responses";
import {ShortUser} from "../types/models/User";

class FriendsService {
    public async fetchFriends() {
        return await axios
            .get<IFriendsResponse>( // Zmień na GET
                `${backendURL}/friends`, // Popraw ścieżkę jeśli potrzeba
                {
                    withCredentials: true, // To wyśle cookies
                }
            )
            .then((res) => res.data);
    }

    public async getAvailableUsers() {
        return await axios
            .get<ShortUser[]>(`${backendURL}/friends/discover`, {
                withCredentials: true,
            })
            .then((res) => res.data);
    }
}

export default FriendsService;
