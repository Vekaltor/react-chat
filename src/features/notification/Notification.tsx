import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { RiErrorWarningFill } from "react-icons/ri";
import { GrStatusWarning } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { IoInformationOutline } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDisptach } from "../../hooks/useAppDisptach";
import { clearNotification } from "./notificationSlice";

const Alert = styled.div<{ color: string }>`
  @keyframes bounceInRight {
    0%,
    60%,
    75%,
    90%,
    100% {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    100% {
      transform: none;
    }
  }
  position: absolute;
  top: 30px;
  right: 30px;
  width: 400px;
  border: none !important;
  padding: 15px;
  margin-bottom: 8px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px 5px ${({ color }) => color};
  background-color: ${({ color }) => color};
  color: #eee;
  animation: bounceInRight 1s both;
  &.closed {
    animation: bounceInRight 1s both;
    animation-direction: alternate-reverse;
  }
`;

const IconTypeAlert = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -15px;
  width: 80px;
  text-align: center;
  svg {
    font-size: 30px;
  }
`;

const WrapperMessage = styled.div`
  margin-left: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  line-height: 1.2;
`;

const TitleMessage = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Message = styled.p`
  font-size: 14px;
  margin-bottom: 0;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Close = styled.div<{ color: string }>`
  box-sizing: content-box;
  opacity: 1;
  background-color: #eee;
  width: 30px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid ${({ color }) => color};
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ color }) => color};
  &:hover svg {
    stroke-width: 50px;
  }
  svg {
    color: ${({ color }) => color};
    font-size: 30px;
    fill: ${({ color }) => color};
    transition: 0.3s;
  }
`;

enum NotificationColor {
  error = "#C20000",
  warning = "#E7B600",
  success = "#A4B123",
  information = "#A3ADB2",
}

type NotificationProps = {
  callback?: () => void;
};

const Notification = (props: NotificationProps): ReactElement | null => {
  const { duration, message, type } = useAppSelector(
    (state) => state.notification
  );
  const { callback } = props;
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDisptach();

  const color: string =
    type === "information"
      ? NotificationColor.information
      : type === "success"
      ? NotificationColor.success
      : type === "warning"
      ? NotificationColor.warning
      : NotificationColor.error;

  const Icon: ReactElement =
    type === "information" ? (
      <IoInformationOutline />
    ) : type === "success" ? (
      <BsCheckLg />
    ) : type === "warning" ? (
      <RiErrorWarningFill />
    ) : (
      <GrStatusWarning />
    );

  const handleClose = () => {
    dispatch(clearNotification());
    setShow(false);
  };

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        dispatch(clearNotification());
        if (callback) callback();
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return show ? (
    <Alert color={color}>
      <IconTypeAlert>{Icon}</IconTypeAlert>
      <WrapperMessage>
        <TitleMessage>{type || "error"}</TitleMessage>
        <Message>{message}.</Message>
      </WrapperMessage>
      <Close onClick={handleClose} color={color}>
        <IoIosClose strokeWidth={30} />
      </Close>
    </Alert>
  ) : null;
};

export default Notification;
