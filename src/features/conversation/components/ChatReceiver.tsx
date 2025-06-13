import WrapperBox from "../../../components/WrapperBox";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {ConversationType} from "../../../types/models/Conversation";

const ChatReceiver = () => {
    const {user} = useAppSelector((state) => state.auth);
    const currentChat = useAppSelector(
        (state) => state.conversation.current
    );

    if (!currentChat) return null;

    const {type, members, conversation_name} = currentChat;

    const isPrivateConversation = () => type === ConversationType.PRIVATE;

    const getNameFriend = () => {
        const friend = members.find((member) => member.user._id !== user?.id)?.user;

        return friend?.name + " " + friend?.surname;
    };

    const getNameMembers = () => {
        let names = "";
        members.forEach(({user}, index) => {
            names += user.name;
            if (members[index + 1]) names += ", ";
        });

        return names;
    };
    const getDefaultName = () => {
        return isPrivateConversation() ? getNameFriend() : getNameMembers();
    };

    return (
        <WrapperBox typeBg="bgTransparent">
            <div>{conversation_name ? conversation_name : getDefaultName()}</div>
            {/*<div>*/}
            {/*  <StyledStatus status={"online"} />*/}
            {/*</div>*/}
        </WrapperBox>
    );
};

export default ChatReceiver;
