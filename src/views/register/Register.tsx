import { S } from "../styles";

type RegisterProps = {
  swapView: () => void;
};

const Register = ({ swapView }: RegisterProps) => {
  return (
    <S.Wrapper>
      <S.LeftSide>
        <S.Header>register</S.Header>
        <S.Form>
          <S.Input name="name" type="text" placeholder="login" />
          <S.Input name="email" type="email" placeholder="email" />
          <S.Input name="password" type="password" placeholder="password" />
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
