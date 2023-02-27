import { useRef } from "react";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import { S } from "../styles";

type LoginProps = {
  swapView: () => void;
};

const Login = ({ swapView }: LoginProps) => {
  const [updateValues, submitHandler] = useForm();
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const handleClick = () => {
    // leftSideRef.current.
    // Stworzyć useAnimation ktore bedzie przyjmowala callback oraz
    // bedzie na czas trawnia animacji czekalo a pozniej wykona callback
    swapView();
  };

  return (
    <S.Wrapper id="login-form">
      <S.LeftSide ref={leftSideRef}>
        <S.Header>Login</S.Header>
        <S.Form onSubmit={submitHandler}>
          <Input
            name="email"
            type="email"
            placeholder="email"
            onChange={updateValues}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={updateValues}
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
