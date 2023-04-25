import axios from "axios";
import { backendURL } from "../config/server";
import {
  IConversationResponse,
  IIdConversationResponse,
} from "../types/responses";

class ConversationService {
  public async getFullConversation(id: string): Promise<IConversationResponse> {
    return await axios
      .get<IConversationResponse>(`${backendURL}/conversation`, {
        withCredentials: true,
        params: {
          id,
        },
      })
      .then((res) => res.data);
  }
  public async getIdConversation(ids: { idUser: string; idFriend: string }) {
    return await axios
      .get<IIdConversationResponse>(`${backendURL}/idConversation`, {
        withCredentials: true,
        params: {
          ids,
        },
      })
      .then((res) => res.data);
  }
}

export default ConversationService;
