import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authActions";
import { LOGOUT_DURATION } from "../../config/config";

const calculateRemainingTime = () => {
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  if (!loginTimestamp) return 0;

  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - loginTimestamp;
  return LOGOUT_DURATION.timeOut - elapsedTime;
};

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const remainingTime = calculateRemainingTime();

    if (remainingTime <= 0) {
      dispatch(logout());
    } else {
      const timerId = setTimeout(() => {
        dispatch(logout());
      }, remainingTime);

      return () => clearTimeout(timerId);
    }
  }, [isAuthenticated, dispatch]);
};

export default useAutoLogout;
