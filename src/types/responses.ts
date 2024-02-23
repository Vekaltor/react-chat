import { Conversation } from "./models/Conversation";
import { RoleMemberByConversation } from "./models/ConversationMember";
import { Friend } from "./models/Friend";
import { ShortUser, User } from "./models/User";

type SuccesResponse = {
  message: string;
};

export interface IRegisterResponse extends SuccesResponse {}

export interface ILoginResponse {
  user: User;
  message: string;
  type: "warning" | "success" | "error" | "information" | null;
}

export interface IActivateAccResponse extends SuccesResponse {}

export interface ILogoutResponse extends SuccesResponse {}

export interface IFriendsResponse {
  friends: Array<Friend>;
}

export interface IConversationResponse extends SuccesResponse {
  conversation: IConversation;
}

export interface IConversation extends Conversation {
  messages: Array<IMessage>;
  members: Array<IMember>;
  id_conversation: string;
}

export interface IMessage {
  _id?: string;
  from_id_user: string;
  message_text: string;
  created_at: string;
}

export interface IMember {
  id_user: number;
  nick_name: string;
  role: RoleMemberByConversation;
  joined_date_time: Date;
  user: ShortUser;
}

export interface IPrivateConversationIdsAndMembersIds extends SuccesResponse {
  conversations: Array<{
    id_conversation: string;
    members: Array<string>;
  }>;
}

export interface ICreatedConversationResponse extends SuccesResponse {
  idConversation: string;
}
