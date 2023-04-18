import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FriendsService from "../../services/friendsService";
import {
  Friend,
  FriendId,
  FriendWithStatus,
  StatusFriend,
} from "../../types/models/Friend";
import { IFriendsResponse } from "../../types/responses";

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
      state.friendsWithStatus = state.friends
        .map((friend) => {
          let status: StatusFriend = payload.includes(friend._id)
            ? "online"
            : "offline";
          return { friend, status };
        })
        .sort((a: FriendWithStatus, b: FriendWithStatus) => {
          if (a.status === "offline" && b.status === "online") return 1;
          else if (a.status === "online" && b.status === "offline") return -1;
          else {
            const aname = a.friend.name.toLowerCase();
            const bname = b.friend.name.toLowerCase();
            if (aname > bname) return 1;
            else if (aname < bname) return -1;
            else return 0;
          }
        });
    },
    updateFriendsOnline(state, { payload }: PayloadAction<FriendId>) {
      state.friendsWithStatus = state.friendsWithStatus.map((friend) => {
        if (friend.friend._id === payload) {
          friend.status = "online";
        }
        return friend;
      });
    },
    updateFriendsOffline(state, { payload }: PayloadAction<FriendId>) {
      state.friendsWithStatus = state.friendsWithStatus.map((friend) => {
        if (friend.friend._id === payload) {
          friend.status = "offline";
        }
        return friend;
      });
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
