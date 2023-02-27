import { useContext } from "react";
import {
  Navigate,
  NavigateFunction,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";
import ThemeTogglerContext from "../contexts/ThemeContext";
import useView from "../hooks/useView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

type LoginProps = {
  isAuth: boolean;
};

enum viewEnums {
  login,
  register,
}

const LoginPage = (props: LoginProps) => {
  const [view, swapView] = useView(viewEnums.login);
  const { isAuth } = props;
  const history: NavigateFunction = useNavigate();
  const themeContext = useContext(ThemeTogglerContext);

  if (isAuth) {
    history(-1);
    <Navigate to="/" />;
    return <Outlet />;
  }

  const viewComponent =
    view === viewEnums.login ? (
      <Login swapView={swapView} />
    ) : (
      <Register swapView={swapView} />
    );

  return (
    <>
      <ThemeSwitch
        onChange={themeContext?.themeToggler}
        theme={themeContext?.theme}
      />
      {viewComponent}
    </>
  );
};

export default LoginPage;
