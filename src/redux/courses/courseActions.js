import {
  FETCH_REQUEST,
  FETCH_COURSES,
  FETCH_COURSE_DETAIL,
  ERROR_STATE,
} from "./courseTypes";
import { apiHelper } from "../apiHelper";
import { SERVER_ROUTE } from "../../config/route";
import { useValidator } from "../../helpers/hooks/useValidator";
export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

// export const fetchCourses = (params) => async (dispatch) => {
//   try {
//     let res = await apiHelper("post", SERVER_ROUTE.get_courses, null, params);
//     if (res?.status === 200) {
//       dispatch({
//         type: FETCH_COURSES,
//         payload: res.data,
//       });
//       return res.data;
//     } else {
//       dispatch({ type: ERROR_STATE });
//       useValidator(res?.data);
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: ERROR_STATE });
//     return null;
//   }
// };

export const FetchCourses = (params) => async (dispatch) => {
  try {
    let res = await apiHelper("post", `fetch-courses`, params);
    if (res?.data) {
      if (res?.data) {
        let { data } = res;
        dispatch({
          type: FETCH_COURSES,
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

// Action creator for fetching a post by its slug from the server
export const FetchCourseDetail = (id) => async (dispatch) => {
  try {
    dispatch(fetchRequest());
    // Send a GET request to the server to fetch the post data based on the provided slug

    let res = await apiHelper("get", `course-detail/${id}`, "");

    // Check if response data exists
    if (res?.data) {
      // If data is received, extract the post data
      let { data } = res;
      // Dispatch an action with the fetched post data
      dispatch({
        type: FETCH_COURSE_DETAIL,
        payload: data,
      });
    } else {
      // If no data received, dispatch an action to indicate error state
      dispatch({
        type: ERROR_STATE,
      });
    }
  } catch (error) {
    // If an error occurs during the fetch process, log the error
    console.log(error);
  }
};
