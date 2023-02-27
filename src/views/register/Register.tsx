import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import { S } from "../styles";

type RegisterProps = {
  swapView: () => void;
};

const Register = ({ swapView }: RegisterProps) => {
  const [updateValues, submitHandler, errors, validateElement] = useForm();
  return (
    <S.Wrapper id="register-form">
      <S.LeftSide>
        <S.Header>register</S.Header>
        <S.Form onSubmit={submitHandler}>
          <Input
            name="name"
            type="text"
            placeholder="name"
            onChange={updateValues}
            onBlur={validateElement}
            message={errors.name}
          />
          <Input
            name="email"
            type="email"
            placeholder="email"
            onChange={updateValues}
            onBlur={validateElement}
            message={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={updateValues}
            onBlur={validateElement}
            message={errors.password}
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
