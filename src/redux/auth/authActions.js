import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  SET_LOADING,
} from "./authTypes";
import { apiHelper } from "../apiHelper";
import { toast } from "react-toastify";
import { SERVER_ROUTE } from "../../config/route";
import { useValidator } from "../../helpers/hooks/useValidator";
import { persistor } from "../combineReducers";
import { fetchCart } from "../cart/cartActions";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await apiHelper("post", SERVER_ROUTE.login, credentials);
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      toast.success(res?.data?.message || "Login successful");
      dispatch(fetchCart(res?.data?.data?.accessToken));
      // Set the login timestamp in localStorage
      const loginTimestamp = new Date().getTime();
      localStorage.setItem("loginTimestamp", loginTimestamp);
      return res;
    } else {
      dispatch({ type: LOGIN_FAIL });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    toast.error("Login failed");
    return null;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await apiHelper("post", SERVER_ROUTE.signup, userData);
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
      toast.success(res?.data?.message || "Signup successful");
      return res.data;
    } else {
      dispatch({ type: SIGNUP_FAIL });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL });
    toast.error("Signup failed");
    return null;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("loginTimestamp");
  dispatch({ type: LOGOUT });
  await persistor.purge();
  dispatch({ type: "RESET_ALL_STATE" });
  window.location.href = "/login";
};
