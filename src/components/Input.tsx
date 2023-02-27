import { S } from "../views/styles";
import MessageInvalidInput from "./MessageInvalidInput";

type InputProps = {
  name: string;
  type: string;
  placeholder?: string | undefined;
  message?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
};

const Input = (props: InputProps) => {
  const { name, type, placeholder, message, onChange, onBlur } = props;
  return (
    <S.Label htmlFor={name}>
      <S.Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        message={message}
      />
      {message ? <MessageInvalidInput message={message} /> : null}
    </S.Label>
  );
};

export default Input;
