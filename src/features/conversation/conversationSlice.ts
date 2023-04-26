import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../../types/models/Conversation";
import {
  IConversationResponse,
  ICreatedConversationResponse,
  IMember,
  IMessage,
} from "../../types/responses";
import ConversationService from "../../services/conversationService";
import { MemberToCreatedConversation } from "../../types/queryParams";

interface ConversationState extends Conversation {
  members: Array<IMember>;
  messages: {
    old: Array<IMessage>;
    latest: Array<IMessage>;
  };
  isLoading: boolean;
  idSelectedConversation: string;
}

const initialState: ConversationState = {
  conversation_name: "",
  options: {
    emoji: "",
    thema: "",
  },
  isLoading: false,
  members: [],
  messages: {
    old: [],
    latest: [],
  },
  idSelectedConversation: "",
};

const conversationSlice = createSlice({
  initialState: initialState,
  name: "conversationSlice",
  reducers: {
    addNewMessage(state, { payload }: PayloadAction<IMessage>) {
      state.messages.latest.push(payload);
    },
    setSelectedConversation(state, { payload }: PayloadAction<string>) {
      state.idSelectedConversation = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversation.pending, (state) => {
      state.messages = initialState.messages;
      state.isLoading = true;
    });
    builder.addCase(
      getConversation.fulfilled,
      (state, { payload }: PayloadAction<IConversationResponse>) => {
        state.isLoading = false;
        state.conversation_name = payload.conversation.conversation_name;
        state.members = payload.conversation.members;
        state.messages.old = payload.conversation.messages;
        state.options = payload.conversation.options;
        state.type = payload.conversation.type;
        state._id = payload.conversation._id;
      }
    );
    builder.addCase(getConversation.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(createConversation.pending, (state) => {
      state = { ...initialState };
      state.isLoading = true;
    });
    builder.addCase(createConversation.fulfilled, (state, { payload }) => {
      state.idSelectedConversation = payload.idConversation;
      state.isLoading = false;
    });
    builder.addCase(createConversation.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export const getConversation = createAsyncThunk<IConversationResponse, string>(
  "conversation/getConversation",
  async (id) => {
    const Service = new ConversationService();
    const response = await Service.getFullConversation(id);
    return response;
  }
);

export const createConversation = createAsyncThunk<
  ICreatedConversationResponse,
  Array<MemberToCreatedConversation>
>("conversation/create", async (members) => {
  const Service = new ConversationService();
  const response = await Service.createConversation(members);
  return response;
});

export const { addNewMessage, setSelectedConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
