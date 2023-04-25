export type ConversationMember = {
  idConversation: number;
  idUser: number;
  joinedDateTime: Date;
  nickName: string;
  role: RoleMemberByConversation;
};

export enum RoleMemberByConversation {
  MEMBER = "member",
  ADMIN = "admin",
}
