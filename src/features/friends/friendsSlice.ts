import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FriendsService from "../../services/friendsService";
import {
  Friend,
  FriendId,
  FriendWithStatus,
  StatusFriend,
} from "../../types/models/Friend";
import { IFriendsResponse } from "../../types/responses";
import { sortASCByStatus } from "./helpers/sortASCByStatus";

interface FriendsState {
  loading: boolean;
  friends: Array<Friend>;
  friendsWithStatus: Array<FriendWithStatus>;
}

const initialState: FriendsState = {
  loading: false,
  friends: [],
  friendsWithStatus: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriendsOnline(state, { payload }: PayloadAction<Array<FriendId>>) {
      let friends = state.friends.map((friend) => {
        let status: StatusFriend = payload.includes(friend._id)
          ? "online"
          : "offline";
        return { friend, status };
      });
      state.friendsWithStatus = sortASCByStatus(friends);
    },
    updateFriendsOnline(state, { payload }: PayloadAction<FriendId>) {
      let updatedList = state.friendsWithStatus.map((friend) => {
        if (friend.friend._id === payload) {
          friend.status = "online";
        }
        return friend;
      });
      state.friendsWithStatus = sortASCByStatus(updatedList);
    },
    updateFriendsOffline(state, { payload }: PayloadAction<FriendId>) {
      let updatedList = state.friendsWithStatus.map((friend) => {
        if (friend.friend._id === payload) {
          friend.status = "offline";
        }
        return friend;
      });
      state.friendsWithStatus = sortASCByStatus(updatedList);
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

export const { setFriendsOnline, updateFriendsOnline, updateFriendsOffline } =
  friendsSlice.actions;

export default friendsSlice.reducer;
