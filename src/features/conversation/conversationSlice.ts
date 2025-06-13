import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Conversation} from "../../types/models/Conversation";
import {
    IConversationResponse,
    ICreatedConversationResponse,
    IMember,
    IMessage,
    IPrivateConversationIdsAndMembersIds,
} from "../../types/responses";
import ConversationService from "../../services/conversationService";
import {MemberToCreatedConversation} from "../../types/queryParams";
import {RootState} from "../../store";
import {ConversationId, UnreadConversation} from "../friends/types/types";

interface CurrentConversation extends Conversation {
    members: Array<IMember>;
    messages: {
        old: Array<IMessage>;
        latest: Array<IMessage>;
    };
}

interface ConversationState {
    current: CurrentConversation | null;
    idSelectedConversation: string;
    privateConversations: Array<{
        id_conversation: string;
        members: Array<string>;
    }>;
    unreadMessagesPerConversation: { [conversationId: string]: number };
    isLoading: boolean;
}

const initCurrentConv : CurrentConversation ={
    conversation_name: "",
    options: {
        emoji: "",
        thema: "",
    },
    members: [],
    messages: {
        old: [],
        latest: [],
    },
}

const initialState: ConversationState = {
    current: initCurrentConv,
    privateConversations: [],
    unreadMessagesPerConversation: {},
    idSelectedConversation: "",
    isLoading: false,
};

const conversationSlice = createSlice({
    initialState: initialState,
    name: "conversationSlice",
    reducers: {
        destroyChat(state) {
            state.idSelectedConversation = "";
            state.current = null
        },
        addNewMessage(state, {payload}: PayloadAction<IMessage>) {
            state.current?.messages.latest.push(payload);
        },
        setSelectedConversation(state, {payload}: PayloadAction<string>) {
            state.idSelectedConversation = payload;
        },
        setConversationAsUnread(state, {payload}: PayloadAction<UnreadConversation>) {
            if (payload.unreadMessages && payload.unreadMessages.length > 0)
                state.unreadMessagesPerConversation[payload.conversationId] = payload.unreadMessages.length;
        },
        deleteConversationFromUnread(
            state,
            {payload}: PayloadAction<ConversationId>
        ) {
            delete state.unreadMessagesPerConversation[payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getConversation.pending, (state) => {
            state.current = {
                conversation_name: "",
                options: {
                    emoji: "",
                    thema: "",
                },
                members: [],
                messages: {
                    old: [],
                    latest: [],
                },
            };
            state.isLoading = true;
        });
        builder.addCase(
            getConversation.fulfilled,
            (state, {payload}: PayloadAction<IConversationResponse>) => {
                state.isLoading = false;
                state.current = {
                    conversation_name: payload.conversation.conversation_name,
                    members: payload.conversation.members,
                    messages: {
                        old: payload.conversation.messages,
                        latest: state.current?.messages.latest || [], // Preserve existing latest messages
                    },
                    options: payload.conversation.options,
                    type: payload.conversation.type,
                    _id: payload.conversation.id_conversation,
                };
            }
        );
        builder.addCase(getConversation.rejected, (state, {payload}) => {
            state.isLoading = false;
        });
        builder.addCase(createConversation.pending, (state) => {
            state.current = {
                conversation_name: "",
                options: {
                    emoji: "",
                    thema: "",
                },
                members: [],
                messages: {
                    old: [],
                    latest: [],
                },
            };
            state.privateConversations = [];
            state.unreadMessagesPerConversation = {};
            state.idSelectedConversation = "";
            state.isLoading = true;
        });
        builder.addCase(createConversation.fulfilled, (state, {payload}) => {
            state.idSelectedConversation = payload.idConversation;
            state.isLoading = false;
        });
        builder.addCase(createConversation.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getPrivateConversations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPrivateConversations.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.privateConversations = payload.conversations;
        });
        builder.addCase(getPrivateConversations.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const getConversation = createAsyncThunk<IConversationResponse, string>(
    "conversation/getConversation",
    async (id, thunkAPI) => {
        const Service = new ConversationService();
        const response = await Service.getFullConversation(id);

        try {
            const {conversation} = thunkAPI.getState() as RootState;
            const idConversation = conversation.idSelectedConversation;
            if (
                idConversation in conversation.unreadMessagesPerConversation &&
                (conversation.unreadMessagesPerConversation[idConversation] || 0)
            ) {
                thunkAPI.dispatch(deleteConversationFromUnread(idConversation));
            }
        } catch (error) {
            console.log(error);
        }

        return response;
    }
);

export const getPrivateConversations = createAsyncThunk<
    IPrivateConversationIdsAndMembersIds,
    string
>("conversation/getPrivateConversations", async (idUser) => {
    const Service = new ConversationService();
    return await Service.getPrivateConversations(idUser);
});

export const createConversation = createAsyncThunk<
    ICreatedConversationResponse,
    Array<MemberToCreatedConversation>
>("conversation/create", async (members) => {
    const Service = new ConversationService();
    return await Service.createConversation(members);
});

export const {
    addNewMessage,
    setSelectedConversation,
    deleteConversationFromUnread,
    destroyChat,
    setConversationAsUnread,
} = conversationSlice.actions;

export default conversationSlice.reducer;
