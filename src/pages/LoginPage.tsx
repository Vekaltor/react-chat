import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import ThemeTogglerContext from "../contexts/ThemeContext";
import useView from "../hooks/useView";

import ThemeSwitch from "../components/ThemeSwitch";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

enum viewEnums {
  login,
  register,
}

const LoginPage = () => {
  const [view, swapView] = useView(viewEnums.login);
  const [cookies, __] = useCookies(["accessToken"]);
  const isAuth = cookies.accessToken;
  const themeContext = useContext(ThemeTogglerContext);

  const viewComponent =
    view === viewEnums.login ? (
      <Login swapView={swapView} />
    ) : (
      <Register swapView={swapView} />
    );

  if (!isAuth)
    return (
      <>
        <ThemeSwitch
          onChange={themeContext?.themeToggler}
          theme={themeContext?.theme}
        />
        {viewComponent}
      </>
    );
  else return <Navigate to="/" />;
};

export default LoginPage;
