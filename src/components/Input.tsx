import { S } from "../views/styles";
import MessageInvalidInput from "./MessageInvalidInput";
import { UseFormRegisterReturn, UseFormRegister } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  error?: string;
  // message?: string | undefined;
  // onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  // onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

const Input = (props: any) => {
  // const { name, type, placeholder, message, onChange, onBlur } = props;
  const { error, name } = props;
  return (
    <S.Label htmlFor={name}>
      <S.Input error="" {...props} {...props.refs} />
      {error ? <MessageInvalidInput message={error.message} /> : null}
    </S.Label>
  );
};

export default Input;
