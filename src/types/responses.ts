import { Conversation } from "./models/Conversation";
import { RoleMemberByConversation } from "./models/ConversationMember";
import { Friend } from "./models/Friend";
import { User } from "./models/User";

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

export type ShortUser = {
  _id: string;
  name: string;
  surname: string;
};

export interface IIdConversationResponse extends SuccesResponse {
  id_conversation: string;
}
