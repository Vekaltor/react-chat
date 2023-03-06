import { S } from "../views/styles";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { InputBaseProps } from "../types/InputBaseProps";
import MessageInvalidInput from "./MessageInvalidInput";

interface InputProps extends InputBaseProps {
  error?: FieldError;
  refs?: UseFormRegisterReturn | any;
}

function Input(props: InputProps): JSX.Element {
  const { error, name, refs } = props;
  return (
    <S.Label htmlFor={name}>
      <S.Input {...refs} {...props} />
      {error?.message ? <MessageInvalidInput message={error.message} /> : null}
    </S.Label>
  );
}

export default Input;
