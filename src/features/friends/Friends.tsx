import {useEffect} from "react";
import {useAppDisptach} from "../../hooks/useAppDisptach";
import {useAppSelector} from "../../hooks/useAppSelector";
import FriendsList from "./components/FriendsList";
import {getFriends} from "./friendsSlice";
import useSocketService from "../../hooks/useSocketService";
import ConversationSocketService from "../conversation/services/conversationSocketService";
import {getPrivateConversations} from "../conversation/conversationSlice";
import {ConversationEvents} from "../conversation/types/conversationSocketEvents";
import WrapperBox from "../../components/WrapperBox";
import Header from "./components/Header";

const Friends = () => {
    const {user} = useAppSelector((state) => state.auth);
    const {friends} = useAppSelector((state) => state.friends);
    const dispatch = useAppDisptach();
    const [conversationSocketService] = useSocketService(ConversationSocketService);

    useEffect(() => {
        conversationSocketService.listeners.getNotifications();

        return () => {
            conversationSocketService.offListener(ConversationEvents.GET_UNREAD_CONVERSATIONS);
        };
    }, []);

    useEffect(() => {
        dispatch(getFriends());
        dispatch(getPrivateConversations(user?.id!));
    }, []);

    return (
        <WrapperBox typeBg="bgTransparent">
            <Header/>
            {friends.length ? <FriendsList/> : null}
        </WrapperBox>
    );
};

export default Friends;
