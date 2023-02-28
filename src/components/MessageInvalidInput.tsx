import StyledMessage from "./styles/MessageInvalidInput.styles";

type Props = {
  message: string;
};

const MessageInvalidInput = (props: Props) => {
  return <StyledMessage>{props.message}</StyledMessage>;
};

export default MessageInvalidInput;
