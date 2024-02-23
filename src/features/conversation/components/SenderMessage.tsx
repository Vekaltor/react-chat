import {useState} from "react";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {addNewMessage} from "../conversationSlice";
import {IMessage} from "../../../types/responses";
import useSocketService from "../../../hooks/useSocketService";
import ConversationSocketService from "../services/conversationSocketService";
import { IoIosSend } from "react-icons/io";

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
        <div style={{display: 'flex', margin:3, height:"40px"}}>
            <input
                type="text"
                onChange={handleChange}
                value={message}
                style={{width: "80%", color:"#333", padding: 10, fontSize:14}}
            />
            <button
                onClick={handleClick}
                style={{
                    display:"flex",
                    gap:5,
                    background:"var(--darkPourple)",
                    color: "#eee",
                    justifyContent:"center",
                    alignItems:"center",
                    flexGrow: 1,
                    marginLeft: 1,
                }}
            >
                <IoIosSend />
                Wyślij
            </button>
        </div>
    );
};

export default ButtonSender;
