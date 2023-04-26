import { useAppSelector } from "../../../hooks/useAppSelector";
import { ConversationType } from "../../../types/models/Conversation";

type TitleChatProps = {
  name: string;
};

const TitleChat = ({ name }: TitleChatProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { type, members } = useAppSelector((state) => state.conversation);

  const isPrivateConversation = () => type === ConversationType.PRIVATE;

  const getNameFriend = () => {
    const friend = members.find((member) => member.user._id !== user?.id)?.user;

    return friend?.name + " " + friend?.surname;
  };

  const getNameMembers = () => {
    let names = "";
    members.forEach(({ user }, index) => {
      names += user.name;
      if (members[index + 1]) names += ", ";
    });

    return names;
  };

  const getDefaultName = () => {
    return isPrivateConversation() ? getNameFriend() : getNameMembers();
  };

  return (
    <div
      style={{
        background: "black",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      {name ? name : getDefaultName()}
    </div>
  );
};

export default TitleChat;
