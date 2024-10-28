import {
  FETCH_TEAMS,
  FETCH_EVENTS,
  FETCH_TESTIMONIALS,
  FETCH_COUNTRIES,
  ERROR_STATE,
} from "./commonTypes";
import { apiHelper } from "../apiHelper";

export const FetchTeams = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-instructors`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_TEAMS,
          payload: data,
        });
      } else {
        dispatch({
          type: ERROR_STATE,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const FetchEvents = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-events`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_EVENTS,
          payload: data,
        });
      } else {
        dispatch({
          type: ERROR_STATE,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const FetchTestimonials = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-testimonials`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_TESTIMONIALS,
          payload: data,
        });
      } else {
        dispatch({
          type: ERROR_STATE,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const FetchCountries = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `countries`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_COUNTRIES,
          payload: data,
        });
      } else {
        dispatch({
          type: ERROR_STATE,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
