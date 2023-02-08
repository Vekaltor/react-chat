import styled from "styled-components";

export const WrapperCenterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgPrimary};
`;
