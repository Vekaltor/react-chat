import axios from "axios";
import { backendURL } from "../config/server";
import {
  IConversationResponse,
  ICreatedConversationResponse,
  IPrivateConversationIdsAndMembersIds,
} from "../types/responses";
import { CreateConversationParams, IdParam } from "../types/queryParams";

class ConversationService {
  public async getFullConversation(
    id: IdParam
  ): Promise<IConversationResponse> {
    return await axios
      .get<IConversationResponse>(`${backendURL}/conversation`, {
        withCredentials: true,
        params: {
          id,
        },
      })
      .then((res) => res.data);
  }

  public async getPrivateConversations(
    idUser: string
  ): Promise<IPrivateConversationIdsAndMembersIds> {
    return await axios
      .get<IPrivateConversationIdsAndMembersIds>(
        `${backendURL}/privateConversations`,
        {
          withCredentials: true,
          params: {
            idUser,
          },
        }
      )
      .then((res) => res.data);
  }

  public async createConversation(members: CreateConversationParams) {
    return await axios
      .post<ICreatedConversationResponse>(
        `${backendURL}/conversation`,
        members,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => res.data);
  }
}

export default ConversationService;
