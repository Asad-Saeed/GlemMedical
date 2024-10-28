import { SETTINGS, ERROR_STATE } from "./settingTypes";
import { apiHelper } from "../apiHelper";
import "react-toastify/dist/ReactToastify.css";

export const fetchSettings = () => async (dispatch) => {
  try {
    let res = await apiHelper("get", `settings`);

    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: SETTINGS,
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
