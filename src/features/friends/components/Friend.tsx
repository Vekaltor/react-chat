import {useEffect, useState} from "react";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {RoleMemberByConversation} from "../../../types/models/ConversationMember";
import {FriendWithStatus as FriendProps} from "../../../types/models/Friend";
import {createConversation, setSelectedConversation} from "../../conversation/conversationSlice";
import NotificationUnreadMessages from "../../conversation/components/NotificationUnreadMessages";
import Avatar from "./Avatar";
import {StyledWrapperFriend} from "./styles/WrapperFriend.styled";
import WrapperBox from "../../../components/WrapperBox";
import {useActiveView} from "../../../contexts/ActiveViewContext";

const Friend = (props: FriendProps) => {
    const {status, friend} = props;
    const [idConversation, setIdConversation] = useState<string>("");
    const {user} = useAppSelector((state) => state.auth);
    const {privateConversations, unreadMessagesPerConversation, current} =
        useAppSelector((state) => state.conversation);
    const {name, surname, photo} = friend;
    const dispatch = useAppDisptach();
    const {setActiveView} = useActiveView();

    const getIdConversation = () => {
        return (
            privateConversations.find(
                ({members}) =>
                    members.includes(user?.id!) && members.includes(friend._id)
            )?.id_conversation || ""
        );
    };

    const handleClick = async () => {
        if (idConversation) {
            setActiveView('chat');
            dispatch(setSelectedConversation(idConversation));
        } else {
            dispatch(
                createConversation([
                    {idUser: user?.id!, role: RoleMemberByConversation.MEMBER},
                    {idUser: friend._id, role: RoleMemberByConversation.MEMBER},
                ])
            );
        }
    };

    useEffect(() => {
        const newIdConversation = getIdConversation();
        setIdConversation(newIdConversation);
    }, [privateConversations, user?.id, friend._id]);

    const isActiveConversation = current?._id === idConversation;

    return (
        <WrapperBox typeBg="bgThirdy">
            <StyledWrapperFriend onClick={handleClick}>
                <Avatar img={photo} status={status} isActive={isActiveConversation}/>
                <span
                    style={{
                        fontSize: 13,
                        fontWeight: 400,
                        letterSpacing: 1,
                        margin: "0 20px 0px 20px",
                        flexGrow: 1,
                    }}
                >
                 {name} {surname}
                </span>
                {idConversation in unreadMessagesPerConversation ? (
                    <NotificationUnreadMessages idConversation={idConversation!}/>
                ) : null}
            </StyledWrapperFriend>
        </WrapperBox>
    );
};

export default Friend;
