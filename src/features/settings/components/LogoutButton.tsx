// @flow
import * as React from 'react';
import { FiLogOut } from "react-icons/fi";
import useSocketService from "../../../hooks/useSocketService";
import AuthSocketService from "../../../services/authSocketService";
import {logoutUser} from "../../../authSlice";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import {StyledLogoutButton} from "../../../layout/styles/LogoutButton.styled";

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useAppDisptach();

    const {user} = useAppSelector((state) => state.auth);
    const [authSocketService] = useSocketService(AuthSocketService);

    const handleLogout = async () => {
        await dispatch(logoutUser()).then(() => {
            navigate('/login');
            authSocketService.senders.logout(user?.id!);
        });
    };

    return (
        <div>
            <StyledLogoutButton onClick={handleLogout}>
                <FiLogOut style={{fontSize:'20px', fontWeight:'bold'}}/>
                Wyloguj
            </StyledLogoutButton>
        </div>
    );
};

export default LogoutButton
