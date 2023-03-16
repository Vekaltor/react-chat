import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FriendsService from "../../services/friendsService";
import { Friend, FriendId } from "../../types/models/Friend";
import { IFriendsResponse } from "../../types/responses";

interface FriendsState {
  loading: boolean;
  friends: Array<Friend>;
  onlineFriends: Array<FriendId>;
}

const initialState: FriendsState = {
  loading: false,
  friends: [],
  onlineFriends: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriendsOnline(state, { payload }: PayloadAction<Array<FriendId>>) {
      state.onlineFriends = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getFriends.fulfilled,
      (state, { payload }: PayloadAction<IFriendsResponse>) => {
        state.loading = false;
        state.friends = payload.friends;
      }
    );
    builder.addCase(getFriends.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getFriends = createAsyncThunk(
  "friends/getFriendsForUser",
  async (idUser: string) => {
    let service = new FriendsService();
    let response = await service.fetchFriends(idUser);
    // .catch((err: AxiosError) => {
    //   console.log(err);
    // });
    return response;
  }
);

export const { setFriendsOnline } = friendsSlice.actions;

export default friendsSlice.reducer;
