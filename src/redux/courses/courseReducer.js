import {
  FETCH_REQUEST,
  FETCH_COURSES,
  FETCH_COURSE_DETAIL,
} from "./courseTypes";

const initialState = {
  user: [],
  coursesList: [],
  courseDetail: [],
  success: false,
  loading: true,
  registered: false,
  error: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSES:
      return {
        ...state,
        coursesList: action.payload,
        success: true,
        loading: false,
        registered: true,
      };
    case FETCH_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: action.payload,
        success: true,
        loading: false,
        registered: true,
      };
    default:
      return state;
  }
};

export default homeReducer;
