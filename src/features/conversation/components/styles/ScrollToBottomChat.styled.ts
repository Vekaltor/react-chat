import styled from "styled-components";

export const ScrollToBottomChatStyled = styled.div`
  position: absolute;
  z-index: 100;
  left: 50%;
  width: 50px;
  height: 50px;
  bottom: 0;
  transform: translateX(-50%);
  border-radius: 50%;
  color: var(--white);
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  animation: slideUp 0.5s ease-out forwards;
  
  &:hover{
    color: var(--white);
    opacity: 0.9;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%) translateX(-50%);
      opacity: 0;
    }
    to {
      transform: translateY(0) translateX(-50%);
      opacity: 0.6;
    }
  }
`;


