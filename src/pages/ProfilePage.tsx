import { useNavigate } from "react-router-dom";
import { useAppDisptach } from "../hooks/useAppDisptach";
import { logoutUser } from "../authSlice";

const ProfilePage = () => {
  const history = useNavigate();
  const dispatch = useAppDisptach();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history("/login");
  };

  return (
    <div>
      <span>profile</span>
      <br></br>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default ProfilePage;
