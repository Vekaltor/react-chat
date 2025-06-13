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

export type ReceivedInvite = {
    id_user_accept: string,
    is_accepted: boolean,
    id_user_request: {
        name: string,
        surname: string,
        _id: string,
    },
    _id: string,
}

export type SentInvite = {
    id_user_accept: {
        name: string,
        surname: string,
        _id: string,
    },
    is_accepted: boolean,
    id_user_request: string,
    _id: string,
}

export type StatusFriend = "online" | "offline";

export type FriendId = string;
