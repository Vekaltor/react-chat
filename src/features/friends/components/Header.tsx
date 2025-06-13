import WrapperBox from "../../../components/WrapperBox";
import {StyledWrapperFlexColumn} from "../../../components/styles/WrapperFlexColumn.styled";
import {StyledWrapperFlexRow} from "../../../components/styles/WrapperFlexRow.styled";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {StyledHeader} from "./styles/Header.styled";
import {StyledCounter, StyledTotalUnreadMessages,} from "./styles/TotalUnreadMessages.styled";
import {IoMdPersonAdd} from 'react-icons/io';
import {useActiveView} from "../../../contexts/ActiveViewContext";
import {useAppDisptach} from "../../../hooks/useAppDisptach";
import {destroyChat} from "../../conversation/conversationSlice";

const Header = () => {
    const {unreadMessagesPerConversation} = useAppSelector(
        (state) => state.conversation
    );
    const {setActiveView} = useActiveView();
    const dispatch = useAppDisptach();

    const countUnreadMessages = (): number => {
        const amountOfMessages = Object.values(unreadMessagesPerConversation);
        if (amountOfMessages.length > 0)
            return amountOfMessages.reduce((sum = 0, value = 0) => sum + value);
        else return 0;
    };

    const handleShowSuggestedFriends = () => {
        dispatch(destroyChat());
        setActiveView('suggested-friends');
    };

    return (
        <WrapperBox typeBg="bgThirdy" style={{marginBottom: "3px"}}>
            <StyledWrapperFlexColumn>
                <StyledWrapperFlexRow style={{justifyContent: "space-between"}}>
                    <StyledHeader>Czaty</StyledHeader>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        {countUnreadMessages() !== 0 ? (
                            <StyledTotalUnreadMessages>
                                <StyledCounter>{countUnreadMessages()}</StyledCounter>
                                New
                            </StyledTotalUnreadMessages>
                        ) : null}
                        <button
                            onClick={handleShowSuggestedFriends}
                            style={{
                                background: 'var(--darkPourple)',
                                color: 'var(--white)',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <IoMdPersonAdd/>
                            Społeczność
                        </button>
                    </div>
                </StyledWrapperFlexRow>
            </StyledWrapperFlexColumn>
        </WrapperBox>
    );
};

export default Header;
