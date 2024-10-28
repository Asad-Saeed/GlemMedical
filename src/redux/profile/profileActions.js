import {
  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  CHANGE_PASSWORD,
  UPDATE_IMAGE,
  ERROR_STATE,
  FETCH_DASHBOARD_INFO,
} from "./profileTypes";
import { apiHelper } from "../apiHelper";
import { SERVER_ROUTE } from "../../config/route";
import { useValidator } from "../../helpers/hooks/useValidator";
import { toast } from "react-toastify";

export const fetchUserInfo = (params) => async (dispatch) => {
  try {
    let res = await apiHelper(
      "get",
      SERVER_ROUTE.student_profile,
      null,
      params
    );
    if (res?.status === 200) {
      dispatch({
        type: FETCH_USER_INFO,
        payload: res.data,
      });
      return res.data;
    } else {
      dispatch({ type: ERROR_STATE });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_STATE });
    return null;
  }
};

export const updateUserInfo = (userInfo, token) => async (dispatch) => {
  try {
    let res = await apiHelper(
      "post",
      SERVER_ROUTE.update_profile,
      userInfo,
      token
    );
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({
        type: UPDATE_USER_INFO,
        payload: res?.data,
      });
      toast.success(res?.data?.message);
      return res?.data;
    } else {
      dispatch({ type: ERROR_STATE });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    dispatch({ type: ERROR_STATE });
    console.log(error);
    return null;
  }
};

export const changePassword = (data, token) => async (dispatch) => {
  try {
    let res = await apiHelper(
      "post",
      SERVER_ROUTE.change_password,
      data,
      token
    );
    if (res?.status === 200 && res?.data?.status === 1) {
      toast.success(res?.data?.message);
      dispatch({
        type: CHANGE_PASSWORD,
      });
      return res?.data;
    } else {
      dispatch({ type: ERROR_STATE });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_STATE });
    return null;
  }
};

export const updateImage = (data, token) => async (dispatch) => {
  try {
    let res = await apiHelper("post", SERVER_ROUTE.change_img, data, token);
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({
        type: UPDATE_IMAGE,
        payload: res.data,
      });
      toast.success(res?.data?.message);
      return res?.data;
    } else {
      useValidator(res?.data);
      dispatch({ type: ERROR_STATE });
      return null;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_STATE });
    return null;
  }
};

export const fetchDashboardData = (params) => async (dispatch) => {
  try {
    let res = await apiHelper("get", SERVER_ROUTE.dashboard, null, params);
    if (res?.status === 200) {
      dispatch({
        type: FETCH_DASHBOARD_INFO,
        payload: res.data,
      });
      return res.data;
    } else {
      dispatch({ type: ERROR_STATE });
      useValidator(res?.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_STATE });
    return null;
  }
};
