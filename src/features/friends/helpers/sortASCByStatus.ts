import { FriendWithStatus } from "../../../types/models/Friend";

export const sortASCByStatus = (friends: Array<FriendWithStatus>) => {
  return friends.sort((a: FriendWithStatus, b: FriendWithStatus) => {
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
};
