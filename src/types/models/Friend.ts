export type Friend = {
  _id: FriendId;
  name: string;
  surname: string;
  photo?: string;
};

export type FriendWithStatus = {
  friend: Friend;
  status: StatusFriend;
};

export type StatusFriend = "online" | "offline";

export type FriendId = string;
