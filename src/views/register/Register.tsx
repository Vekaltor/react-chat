import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser } from "../../authSlice";
import { RegisterElements } from "../../types/forms";
import { S } from "../styles";
import Notification from "../../features/notification/Notification";
import Input from "../../components/Input";
import { WrapperCenterPage } from "../../components/styles/WrapperCenterPage";

type RegisterProps = {
  swapView: () => void;
};

const Register = ({ swapView }: RegisterProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<RegisterElements>();
  const { errors } = formState;
  const { message, type } = useAppSelector((state) => state.notification);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisptach();

  const formSubmit: SubmitHandler<RegisterElements> = (
    data: RegisterElements
  ): void => {
    dispatch(registerUser(data));
    if (type === "success") reset();
  };

  return (
    <WrapperCenterPage>
      <S.Wrapper id="register-form">
        {message ? <Notification /> : null}
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
            />
            <S.ButtonSubmit
              type="submit"
              disabled={loading || message ? true : false}
            >
              sign up
            </S.ButtonSubmit>
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
    </WrapperCenterPage>
  );
};

export default Register;
