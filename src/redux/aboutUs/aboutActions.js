import { FETCH_ABOUT_US, ERROR_STATE } from "./aboutTypes";
import { apiHelper } from "../apiHelper";

export const FetchAbouts = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `fetch-abouts`, "");
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_ABOUT_US,
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
