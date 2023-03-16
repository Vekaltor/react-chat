export type Friend = {
  _id: FriendId;
  name: string;
  surname: string;
  photo?: string;
};

export type StatusFriend = "online" | "offline";

export type FriendId = string;
