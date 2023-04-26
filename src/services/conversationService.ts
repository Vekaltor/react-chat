import axios from "axios";
import { backendURL } from "../config/server";
import {
  IConversationResponse,
  ICreatedConversationResponse,
  IOnlyIdConversationResponse,
} from "../types/responses";
import {
  CreateConversationParams,
  IdParam,
  IdsPrivateConversationParams,
} from "../types/queryParams";

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

  public async getIdConversation(
    ids: IdsPrivateConversationParams
  ): Promise<IOnlyIdConversationResponse> {
    return await axios
      .get<IOnlyIdConversationResponse>(`${backendURL}/idConversation`, {
        withCredentials: true,
        params: {
          ids,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
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
