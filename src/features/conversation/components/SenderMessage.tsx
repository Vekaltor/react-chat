import {useState} from "react";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {addNewMessage} from "../conversationSlice";
import {IMessage} from "../../../types/responses";
import useSocketService from "../../../hooks/useSocketService";
import ConversationSocketService from "../services/conversationSocketService";

type ButtonSenderProps = {
    conversationId: string;
    userId: string;
};

const ButtonSender = (props: ButtonSenderProps) => {
    const {conversationId, userId} = props;

    const [message, setMessage] = useState<string>("");
    const [Service] = useSocketService(ConversationSocketService);
    const dispatch = useAppDisptach();

    const handleClick = (): void => {
        if (message === "") return;

        const newMessage: IMessage = {
            from_id_user: userId,
            message_text: message,
            created_at: new Date().toISOString(),
        };

        dispatch(addNewMessage(newMessage));
        Service.senders.sendMessage(newMessage, conversationId);
        setMessage("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.target.value);
    };

    return (
        <div
            style={{
                display: 'flex'
            }}
        >
            <input
                type="text"
                onChange={handleChange}
                value={message}
                style={{width: "85%"}}
            />
            <button
                onClick={handleClick}
                style={{
                    background: "#333",
                    color: "#EEE",
                    padding: "3px 30px",
                    marginLeft: 1,
                }}
            >
                Send
            </button>
        </div>
    );
};

export default ButtonSender;
