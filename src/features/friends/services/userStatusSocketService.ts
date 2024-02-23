import type { Socket } from "socket.io-client";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import {
  setFriendsOnline,
  updateFriendsOffline,
  updateFriendsOnline,
} from "../friendsSlice";
import { Friend, FriendId } from "../../../types/models/Friend";
import { UserStatusEvents } from "../types/userStatusSocketEvents";

class UserStatusSocketService {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  private dispatch = useAppDisptach();

  public listeners = {
    getOnlineFriends: (): void => {
      this.socket.on(
        UserStatusEvents.GET_ONLINE_FRIENDS,
        (friendsOnline: Array<FriendId>) => {
          this.dispatch(setFriendsOnline(friendsOnline));
        }
      );
    },
    friendOffline: (friends: Array<Friend>): void => {
      this.socket.on(UserStatusEvents.FRIEND_OFFLINE, (userId: string) => {
        if (this.isFriend(friends, userId)) {
          this.dispatch(updateFriendsOffline(userId));
        }
      });
    },
    friendOnline: (friends: Array<Friend>): void => {
      this.socket.on(UserStatusEvents.FRIEND_ONLINE, (userId: string) => {
        if (this.isFriend(friends, userId)) {
          this.dispatch(updateFriendsOnline(userId));
        }
      });
    },
  };

  public senders = {
    checkStatusFriends: (friends: Array<Friend>): void => {
      const friendsIds: Array<FriendId> = this.getOnlyIds(friends);
      this.socket.emit(UserStatusEvents.CHECK_ONLINE_FRIENDS, friendsIds);
    },
  };

  private isFriend = (friends: Array<Friend>, idUser: string): boolean =>
    friends.find((friend) => friend._id === idUser) ? true : false;

  private getOnlyIds = (friends: Array<Friend>): FriendId[] =>
    friends.map((friend) => friend._id);
}

export default UserStatusSocketService;
