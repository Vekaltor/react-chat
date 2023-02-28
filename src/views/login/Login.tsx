import { ChangeEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { LoginElements } from "../../types/forms";
import { S } from "../styles";

type LoginProps = {
  swapView: () => void;
};

const Login = ({ swapView }: LoginProps) => {
  const { register, handleSubmit, formState } = useForm<LoginElements>();
  const { errors } = formState;
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const formSubmit: SubmitHandler<LoginElements> = (
    data: LoginElements
  ): void => {
    // dispatch(()=>{});
  };

  const handleClick = () => {
    // leftSideRef.current.
    // Stworzyć useAnimation ktore bedzie przyjmowala callback oraz
    // bedzie na czas trawnia animacji czekalo a pozniej wykona callback
    swapView();
  };

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
  };

  return (
    <S.Wrapper id="login-form">
      <S.LeftSide ref={leftSideRef}>
        <S.Header>Login</S.Header>
        <S.Form onSubmit={handleSubmit(formSubmit)} noValidate>
          <Input
            refs={register("email", {
              required: "Email cannot be empty",
            })}
            error={errors.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            refs={register("pass", {
              required: "Password cannot be empty",
            })}
            error={errors.pass}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <S.ForgottenPasword>Forgot your password?</S.ForgottenPasword>
          <S.ButtonSubmit type="submit">sign in</S.ButtonSubmit>
        </S.Form>
      </S.LeftSide>
      <S.RightSide ref={rightSideRef}>
        <S.Header>Hello, Friend!</S.Header>
        <S.Text>Enter your personal details and start journey with us</S.Text>
        <S.ButtonSubmit onClick={handleClick}>sign up</S.ButtonSubmit>
      </S.RightSide>
    </S.Wrapper>
  );
};

export default Login;
