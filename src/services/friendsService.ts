import axios from "axios";
import { backendURL } from "../config/server";
import { IFriendsResponse } from "../types/responses";

class FriendsService {
  public async fetchFriends(idUser: string) {
    return await axios
      .post<IFriendsResponse>(
        `${backendURL}/friends`,
        { idUser },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);
  }
}

export default FriendsService;
