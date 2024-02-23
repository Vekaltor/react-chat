import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../authSlice";
import Input from "../../components/Input";
import Loader from "../../features/loader/Loader";
import Notification from "../../features/notification/Notification";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { LoginElements } from "../../types/forms";
import { S } from "../styles";
import { WrapperCenterPage } from "../../components/styles/WrapperCenterPage";

type LoginProps = {
  swapView: () => void;
};

const Login = ({ swapView }: LoginProps) => {
  const { register, handleSubmit, formState } = useForm<LoginElements>({
    defaultValues: {
      email: "",
      pass: "",
    },
  });
  const { errors } = formState;
  const { message } = useAppSelector((state) => state.notification);
  const { isAuthorizated, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDisptach();
  const history = useNavigate();

  const formSubmit: SubmitHandler<LoginElements> = async (
    data: LoginElements
  ) => {
    await dispatch(loginUser(data));
    if (!message) history("/");
  };

  const handleClick = () => {
    swapView();
  };

  return (
    <WrapperCenterPage>
      <S.Wrapper id="login-form">
        {message ? <Notification /> : null}
        {loading ? <Loader background="rgba(0,0,0,0.2)" /> : null}
        <S.LeftSide>
          <S.Header>Login</S.Header>
          <S.Form onSubmit={handleSubmit(formSubmit)} noValidate>
            <Input
              refs={register("email", {
                required: "Email cannot be empty",
              })}
              error={errors.email}
              type="email"
              placeholder="Email"
            />
            <Input
              refs={register("pass", {
                required: "Password cannot be empty",
              })}
              error={errors.pass}
              type="password"
              placeholder="Password"
            />
            <S.ForgottenPasword>Forgot your password?</S.ForgottenPasword>
            <S.ButtonSubmit type="submit" disabled={isAuthorizated}>
              sign in
            </S.ButtonSubmit>
          </S.Form>
        </S.LeftSide>
        <S.RightSide>
          <S.Header>Hello, Friend!</S.Header>
          <S.Text>Enter your personal details and start journey with us</S.Text>
          <S.ButtonSubmit onClick={handleClick}>sign up</S.ButtonSubmit>
        </S.RightSide>
      </S.Wrapper>
    </WrapperCenterPage>
  );
};

export default Login;
