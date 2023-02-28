import { ChangeEvent, useRef } from "react";
import { registerUser } from "../../authActions";
import Input from "../../components/Input";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RegisterElements } from "../../types/forms";
import { S } from "../styles";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterProps = {
  swapView: () => void;
};

const Register = ({ swapView }: RegisterProps) => {
  const { register, handleSubmit, formState } = useForm<RegisterElements>();
  const { errors } = formState;

  const { error, loading, message } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisptach();

  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
  };

  const formSubmit: SubmitHandler<RegisterElements> = (
    data: RegisterElements
  ): void => {
    dispatch(registerUser(data));
  };

  return (
    <S.Wrapper id="register-form">
      <S.LeftSide>
        <S.Header>register</S.Header>
        <S.Form onSubmit={handleSubmit(formSubmit)}>
          <Input
            refs={register("name", {
              required: "Name cannot be empty",
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: "Only letters are allowed",
              },
            })}
            error={errors.name}
            type="text"
            placeholder="Name"
            onChange={(e: ChangeEvent) => handleChange(e)}
          />
          <Input
            refs={register("surname", {
              required: "Surname cannot be empty",
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: "Only letters are allowed",
              },
            })}
            error={errors.surname}
            type="text"
            placeholder="Surname"
            onChange={(e: ChangeEvent) => handleChange(e)}
          />
          <Input
            refs={register("email", {
              required: "Email cannot be empty",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email address is invalid",
              },
            })}
            error={errors.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            refs={register("pass", {
              required: "Password cannot be empty",
              minLength: {
                value: 8,
                message: "Password length is too small",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%.]).*$/,
                message: "Password should be strong",
              },
            })}
            error={errors.pass}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <S.ButtonSubmit type="submit">sign up</S.ButtonSubmit>
        </S.Form>
      </S.LeftSide>
      <S.RightSide>
        <S.Header>Welcome Back!</S.Header>
        <S.Text>
          To keep connected with us please login with your personal info
        </S.Text>
        <S.ButtonSubmit onClick={swapView}>sign in</S.ButtonSubmit>
      </S.RightSide>
    </S.Wrapper>
  );
};

export default Register;
