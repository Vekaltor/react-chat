export type Conversation = {
  _id?: string;
  conversation_name: string;
  options: OptionsConversation;
  type?: ConversationType;
};

export type OptionsConversation = {
  thema: string;
  emoji: string;
};

export enum ConversationType {
  PRIVATE = "private",
  GROUP = "group",
  undefined = "",
}
