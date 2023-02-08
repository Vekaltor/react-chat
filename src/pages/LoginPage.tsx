import { useContext } from "react";
import {
  Navigate,
  NavigateFunction,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";
import ThemeTogglerContext from "../contexts/ThemeTogglerContext";
import useView from "../hooks/useView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

type LoginProps = {
  isAuth: boolean;
};

const LoginPage = (props: LoginProps) => {
  const [view, swapView] = useView();
  const { isAuth } = props;
  const history: NavigateFunction = useNavigate();
  const themeContext = useContext(ThemeTogglerContext);

  if (isAuth) {
    history(-1);
    <Navigate to="/" />;
    return <Outlet />;
  }

  return view === "login" ? (
    <>
      <ThemeSwitch
        onChange={themeContext?.themeToggler}
        theme={themeContext?.theme}
      />
      <Login swapView={swapView} />
    </>
  ) : (
    <>
      <ThemeSwitch
        onChange={themeContext?.themeToggler}
        theme={themeContext?.theme}
      />
      <Register swapView={swapView} />
    </>
  );
};

export default LoginPage;
