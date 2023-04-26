import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { useAppSelector } from "../../../hooks/useAppSelector";
import ConversationService from "../../../services/conversationService";
import { RoleMemberByConversation } from "../../../types/models/ConversationMember";
import { FriendWithStatus as FriendProps } from "../../../types/models/Friend";
import {
  createConversation,
  setSelectedConversation,
} from "../../conversation/conversationSlice";
import FriendStatus from "./FriendStatus";

const Friend = (props: FriendProps) => {
  const { status, friend } = props;
  const { user } = useAppSelector((state) => state.auth);
  const { name, surname, photo } = friend;
  const dispatch = useAppDisptach();

  const getIdConversation = async () => {
    const conversationService = new ConversationService();
    let ids = {
      idUser: user?.id!,
      idFriend: friend._id,
    };
    return await conversationService.getIdConversation(ids);
  };

  const handleClick = async () => {
    const idConversation: string | undefined = (await getIdConversation())
      ?.id_conversation;

    if (idConversation) {
      dispatch(setSelectedConversation(idConversation));
    } else {
      dispatch(
        createConversation([
          { idUser: user?.id!, role: RoleMemberByConversation.MEMBER },
          { idUser: friend._id, role: RoleMemberByConversation.MEMBER },
        ])
      );
    }
  };

  return (
    <li style={{ display: "flex", cursor: "pointer" }} onClick={handleClick}>
      <FriendStatus status={status} />
      <span style={{ fontSize: 15, margin: "0 0 10px 20px" }}>
        {name} {surname}
      </span>
    </li>
  );
};

export default Friend;
