import styled from "styled-components";

const Header = styled.h1`
  text-align: center;
  text-transform: capitalize;
  color: #333;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  padding: 25px 0;
  border-radius: 10px 0 0 10px;
  background-color: white;
  ${Header} {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input<{ error: string | undefined }>`
  background-color: #eee;
  border: 1px solid;
  border-color: ${({ error }) => (error ? "red" : "#eee")};
  padding: 12px 15px;
  font-size: 0.8em;
  &::placeholder {
    text-transform: capitalize;
  }
  &[valid="true"] {
    border-color: greenyellow;
  }
`;

const ForgottenPasword = styled.span`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0 10px 0;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ButtonSubmit = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  width: fit-content;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  padding: 30px;
  border-radius: 0 10px 10px 0;
  background-color: #ff416c;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  ${Header} {
    color: white;
  }
  ${ButtonSubmit} {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 400px;
  height: auto;
  width: 600px;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  background-color: ${({ theme }) => theme.bgPrimary};
  &[id="register-form"] {
    flex-direction: row-reverse;
    ${LeftSide} {
      border-radius: 0 10px 10px 0;
    }
    ${RightSide} {
      border-radius: 10px 0 0 10px;
      background: linear-gradient(to left, #ff4b2b, #ff416c);
    }
  }
`;

const Label = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-align: center;
  color: white;
`;

export const S = {
  Wrapper,
  LeftSide,
  RightSide,
  Header,
  Form,
  Input,
  ButtonSubmit,
  ForgottenPasword,
  Text,
  Label,
};
