import { RoleMemberByConversation } from "./models/ConversationMember";

export type ActivateAccParams = {
  id?: IdParam;
  token?: string;
};

export type IdsPrivateConversationParams = {
  idUser: IdParam;
  idFriend: IdParam;
};

export type IdParam = string;

export type CreateConversationParams = Array<MemberToCreatedConversation>;

export type MemberToCreatedConversation = {
  idUser: IdParam;
  role: RoleMemberByConversation;
};
