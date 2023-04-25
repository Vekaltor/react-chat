import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../../types/models/Conversation";
import {
  IConversationResponse,
  IMember,
  IMessage,
} from "../../types/responses";
import ConversationService from "../../services/conversationService";

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
    createNewConversation(state, { payload }) {},
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
  },
});

export const getConversation = createAsyncThunk<IConversationResponse, string>(
  "conversation/getConversation",
  async (id, thunkAPI) => {
    const Service = new ConversationService();
    const response = await Service.getFullConversation(id);
    return response;
  }
);

export const { addNewMessage, setSelectedConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
