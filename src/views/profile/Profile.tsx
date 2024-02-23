import {useEffect} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";

import Chat from "../../features/conversation/Chat";
import useSocketService from "../../hooks/useSocketService";
import AuthSocketService from "../../services/authSocketService";
import WrapperBox from "../../components/WrapperBox";
import SideBarMenu from "../../layout/SideBarMenu";

const style = {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 6fr",
    gridTemplateRows: "1fr",
    gridColumnGap: "3px",
};

const Profile = () => {
    const {user} = useAppSelector((state) => state.auth);
    const [Service] = useSocketService(AuthSocketService);

    useEffect(() => {
        Service.connect(user?.id!);
        Service.senders.login(user?.id!);
        return () => {
            Service.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WrapperBox typeBg="bgTransparent" style={style}>
            <SideBarMenu/>
            <Chat/>
        </WrapperBox>
    );
};

export default Profile;
