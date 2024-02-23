import WrapperBox from "../../../components/WrapperBox";
import { StyledWrapperFlexColumn } from "../../../components/styles/WrapperFlexColumn.styled";
import { StyledWrapperFlexRow } from "../../../components/styles/WrapperFlexRow.styled";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { StyledHeader } from "./styles/Header.styled";
import {
  StyledCounter,
  StyledTotalUnreadMessages,
} from "./styles/TotalUnreadMessages.styled";

const Header = () => {
  const { unreadMessagesPerConversation } = useAppSelector(
    (state) => state.conversation
  );

  console.log("hedearrr ");

  const countUnreadMessages = (): number => {
    const amountOfMessages = Object.values(unreadMessagesPerConversation);
    console.log(unreadMessagesPerConversation);
    if (amountOfMessages.length > 0)
      return amountOfMessages.reduce((sum = 0, value = 0) => sum + value);
    else return 0;
  };

  return (
    <WrapperBox typeBg="bgThirdy" style={{marginBottom:"3px"}}>
      <StyledWrapperFlexColumn>
        <StyledWrapperFlexRow style={{ justifyContent: "space-between" }}>
          <StyledHeader>Czaty</StyledHeader>
          {countUnreadMessages() !== 0 ? (
            <StyledTotalUnreadMessages>
              <StyledCounter>{countUnreadMessages()}</StyledCounter>
              New
            </StyledTotalUnreadMessages>
          ) : null}
        </StyledWrapperFlexRow>
      </StyledWrapperFlexColumn>
    </WrapperBox>
  );
};

export default Header;
