import { CSSProperties } from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IMessage as MessageProps } from "../../../types/responses";

const Message = (props: MessageProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const style1: CSSProperties = {
    margin: "5px",
    borderRadius: "0 10px 10px 10px",
    background: "var(--darkGrey)",
    padding: 16,
    width: "fit-content",
    color: "grey",
    fontSize: 12,
    wordWrap: "break-word",
    maxWidth: "300px",
  };

  const style2: CSSProperties = {
    margin: " 5px",
    borderRadius: "10px 0 10px 10px",
    background: "var(--lightPourple)",
    padding: 16,
    width: "fit-content",
    color: "var(--white)",
    justifySelf: "right",
    fontSize: 12,
    wordWrap: "break-word",
    maxWidth: "300px",
  };

  const timeAgo = () => {
    if (!props.created_at) return "";
    const createdAt = new Date(props.created_at).getTime();
    const now = Date.now();
    const minutesAgo = Math.floor((now - createdAt) / (1000 * 60));
    if (minutesAgo >= 60) {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo >= 24) {
        return Math.floor(hoursAgo / 24) + " d";
      }
      return hoursAgo + " h";
    } else {
      if (minutesAgo < 1) return "teraz";
      return minutesAgo + " min";
    }
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
      <div style={props.from_id_user === user?.id! ? style2 : style1}>
        {props.message_text}
      </div>
      <div
        style={{
          padding: "0 10px",
          fontSize: 9,
          color: "white",
        }}
      >
        {timeAgo()}
      </div>
    </div>
  );
};

export default Message;
