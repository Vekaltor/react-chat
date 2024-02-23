import {CSSProperties} from "styled-components";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {IMessage as MessageProps} from "../../../types/responses";
import Avatar from "../../friends/components/Avatar";

const Message = (props: MessageProps) => {
    const {user} = useAppSelector((state) => state.auth);

    const memberMessageStyle: CSSProperties = {
        margin: "5px",
        borderRadius: "0 10px 10px 10px",
        background: "var(--white)",
        padding: 12,
        width: "fit-content",
        color: "black",
        fontSize: 12,
        wordWrap: "break-word",
        maxWidth: "400px",
        lineHeight: 1.5,
    };

    const ownMessageStyle: CSSProperties = {
        margin: " 5px",
        borderRadius: "10px 0 10px 10px",
        background: "var(--lightPourple)",
        padding: 12,
        width: "fit-content",
        color: "var(--white)",
        justifySelf: "right",
        fontSize: 12,
        wordWrap: "break-word",
        maxWidth: "400px",
        lineHeight: 1.5,
    };

    const formatMessageTime = () => {
        if (!props.created_at) return "";
        const createdAt = new Date(props.created_at);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInMinutes < 1) return "teraz";
        if (diffInMinutes < 60) return `${diffInMinutes} min temu`;
        if (diffInHours < 24) return `${diffInHours} h temu`;
        if (diffInHours < 48) return "1 d temu";
        if (diffInDays < 30) return `${diffInDays} dni temu`;
        if (diffInMonths < 12) return diffInMonths === 1 ? "1 miesiąc temu" : `${diffInMonths} miesięcy temu`;
        return diffInYears === 1 ? "1 rok temu" : `${diffInYears} lat temu`;
    };

    return (
        <div
            style={{
                margin: "5px 0",
                width: "100%",
                display: "grid",
                flexDirection: "column",
                textAlign: props.from_id_user === user?.id! ? "right" : "left",
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: props.from_id_user === user?.id! ? "row-reverse" : "row",
            }}>
                <div style={{marginTop: "5px"}}>
                    <Avatar img={""} status={"offline"} size={"verySmall"}/>
                </div>
                <div>
                    <div style={props.from_id_user === user?.id! ? ownMessageStyle : memberMessageStyle}>
                        {props.message_text}
                    </div>
                    <div
                        style={{
                            padding: "0 10px",
                            fontSize: 9,
                            color: "white",
                        }}
                    >
                        {formatMessageTime()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
