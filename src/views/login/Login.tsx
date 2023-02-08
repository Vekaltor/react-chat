import useForm from "../../hooks/useForm";
import { S } from "../styles";

type LoginProps = {
  swapView: () => void;
};

const Login = ({ swapView }: LoginProps) => {
  const [updateValues, submitHandler, errors] = useForm({});
  return (
    <S.Wrapper>
      <S.LeftSide>
        <S.Header>Login</S.Header>
        <S.Form onSubmit={submitHandler}>
          <S.Input
            name="email"
            type="email"
            placeholder="email"
            onChange={updateValues}
          />
          <S.Input
            name="password"
            type="password"
            placeholder="password"
            onChange={updateValues}
          />
          <S.ForgottenPasword>Forgot your password?</S.ForgottenPasword>
          <S.ButtonSubmit type="submit" disabled={errors.length > 0}>
            sign in
          </S.ButtonSubmit>
        </S.Form>
      </S.LeftSide>
      <S.RightSide>
        <S.Header>Hello, Friend!</S.Header>
        <S.Text>Enter your personal details and start journey with us</S.Text>
        <S.ButtonSubmit onClick={swapView}>sign up</S.ButtonSubmit>
      </S.RightSide>
    </S.Wrapper>
  );
};

export default Login;
