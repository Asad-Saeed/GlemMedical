import { CONTACT_US, ERROR_STATE } from "./contactUsTypes";
import { apiHelper } from "../apiHelper";
import "react-toastify/dist/ReactToastify.css";

export const ContactUs = (formData) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `contact-us`, formData);

    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: CONTACT_US,
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
