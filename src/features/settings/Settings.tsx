// @flow
import * as React from 'react';
import {CSSProperties} from 'react';
import LogoutButton from "./components/LogoutButton";
import ThemeSwitch from "../../components/ThemeSwitch";
import WrapperBox from "../../components/WrapperBox";

const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px"
}

const Settings = () => {
    return (
        <WrapperBox typeBg={"bgThirdy"} style={style}>
            <LogoutButton/>
            <ThemeSwitch/>
        </WrapperBox>
    );
};

export default Settings
