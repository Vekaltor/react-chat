// @flow
import * as React from 'react';
import {ScrollToBottomChatStyled} from "./styles/ScrollToBottomChat.styled";
import {IoIosArrowDropdownCircle} from "react-icons/io";

type Props = {
    click: () => void
}

const ScrollToBottomChat = (props: Props) => {
    return (
        <ScrollToBottomChatStyled onClick={props.click}>
            <IoIosArrowDropdownCircle/>
        </ScrollToBottomChatStyled>
    );
};

export default ScrollToBottomChat
