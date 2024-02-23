import { useEffect } from "react";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import FriendsList from "./components/FriendsList";
import { getFriends } from "./friendsSlice";
import useSocketService from "../../hooks/useSocketService";
import ConversationSocketService from "../conversation/services/conversationSocketService";
import { getPrivateConversations } from "../conversation/conversationSlice";
import { ConversationEvents } from "../conversation/types/conversationSocketEvents";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../authSlice";
import AuthSocketService from "../../services/authSocketService";
import WrapperBox from "../../components/WrapperBox";
import ThemeSwitch from "../../components/ThemeSwitch";

const Friends = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { friends } = useAppSelector((state) => state.friends);
  const dispatch = useAppDisptach();
  const [conversationSocketService, socket] = useSocketService(ConversationSocketService);

  //ALL TO MOVE TO OTHER COMPONNENT
  const history = useNavigate();
  const [authSocketService] = useSocketService(AuthSocketService);
  const { current } = useAppSelector((state) => state.conversation);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    conversationSocketService.senders.leaveFromChat(user?.id!, current._id!, socket);
    authSocketService.senders.logout(user?.id!);
    history("/login");
  };
  // HERE END

  useEffect(() => {
    conversationSocketService.listeners.getAllUnreadConversations();
    conversationSocketService.listeners.getNotifications();
    conversationSocketService.senders.checkNotifications(user?.id!);
    return () => {
      conversationSocketService.offListener(ConversationEvents.GET_UNREAD_CONVERSATIONS);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getFriends(user?.id!));
    dispatch(getPrivateConversations(user?.id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperBox typeBg="bgTransparent">
      {friends.length ? <FriendsList /> : null}
      <button style={{ color: "whitesmoke" }} onClick={handleLogout}>
        LOGOUT
      </button>
      <br></br>
      <ThemeSwitch />
    </WrapperBox>
  );
};

export default Friends;
