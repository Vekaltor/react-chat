/* eslint-disable @typescript-eslint/no-unused-vars */
import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
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
    const [cookies, __] = useCookies(["user"]);
    const isAuth = cookies.user;

    const viewComponent =
        view === viewEnums.login ? (
            <Login swapView={swapView}/>
        ) : (
            <Register swapView={swapView}/>
        );

    if (!isAuth)
        return (
            <div style={{position: "relative"}}>
                <div style={{padding: "30px", position: "absolute", right: 0}}>
                    <ThemeSwitch/>
                </div>
                {viewComponent}
            </div>
        );
    else return <Navigate to="/"/>;
};

export default LoginPage;
