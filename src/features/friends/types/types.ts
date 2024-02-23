export interface UnreadConversation {
    conversationId: ConversationId,
    unreadMessages: Array<MessageConversation>
}

interface MessageConversation {
    from_id_user: string,
    message_text: string,
    created_at: string
}

export type ConversationId = string;
