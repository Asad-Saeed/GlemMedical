import {
  FETCH_SLIDERS,
  FETCH_COURSE_CATEGORES,
  ERROR_STATE,
} from "./homeTypes";
import { apiHelper } from "../apiHelper";

export const FetchSliders = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-sliders`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_SLIDERS,
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

export const FetchCourseCategories = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-categories`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_COURSE_CATEGORES,
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
