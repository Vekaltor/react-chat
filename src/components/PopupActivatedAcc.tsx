import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../services/authService";
import { ActivateAccParams } from "../types/queryParams";
import { AxiosError } from "axios";
import { IActivateAccError } from "../types/errors";
import { IActivateAccResponse } from "../types/responses";

const PopupActivatedAcc = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [activated, setActivated] = useState<boolean>(false);
  const params = useParams<ActivateAccParams>();
  const navigate = useNavigate();

  const redirtectToLogin = () => {
    navigate("/login");
  };

  const handleActivateAcc = () => {
    let service = new AuthService();
    service
      .activate(params)
      .then((data: IActivateAccResponse) => {
        setMessage(data.message);
        setActivated(true);
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as IActivateAccError;
        setMessage(error.error.message);
        setError(true);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 200,
        background: "black",
        color: "white",
      }}
    >
      <span>{message}</span>
      {activated ? (
        <button
          style={{
            color: "red",
          }}
          onClick={redirtectToLogin}
        >
          Go to login !
        </button>
      ) : (
        <button
          style={{
            color: "red",
          }}
          disabled={error}
          onClick={handleActivateAcc}
        >
          {error ? "Upps... link expired" : "Active your account !"}
        </button>
      )}
    </div>
  );
};

export default PopupActivatedAcc;
