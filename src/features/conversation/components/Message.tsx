import { CSSProperties } from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IMessage as MessageProps } from "../../../types/responses";

const Message = (props: MessageProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const style1: CSSProperties = {
    margin: "5px",
    borderRadius: "10px",
    background: "#333",
    padding: 10,
    width: "fit-content",
    color: "white",
    fontSize: 14,
  };

  const style2: CSSProperties = {
    margin: " 5px",
    borderRadius: "10px",
    background: "#333",
    padding: 10,
    width: "fit-content",
    color: "white",
    justifySelf: "right",
    fontSize: 14,
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
      <div style={{ padding: "0 10px", fontSize: 11, fontWeight: "bolder" }}>
        {timeAgo()}
      </div>
    </div>
  );
};

export default Message;
