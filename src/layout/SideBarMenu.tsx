// @flow
import * as React from 'react';
import WrapperBox from "../components/WrapperBox";
import {CSSProperties} from "react";
import Friends from "../features/friends/Friends";
import Settings from "../features/settings/Settings";

const style: CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
}

const SideBarMenu = () => {
    return (
        <WrapperBox typeBg={"bgTransparent"} style={style} typeColor={"colorPrimary"}>
            <Friends/>
            <Settings/>
        </WrapperBox>
    );
};

export default SideBarMenu
