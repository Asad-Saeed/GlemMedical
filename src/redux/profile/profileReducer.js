import {
  FETCH_USER_INFO,
  UPDATE_USER_INFO,
  CHANGE_PASSWORD,
  UPDATE_IMAGE,
  ERROR_STATE,
  FETCH_DASHBOARD_INFO,
} from "./profileTypes";

const initialState = {
  userInfo: {},
  dashboardInfo: {},
  success: false,
  loading: true,
  error: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        success: true,
        loading: false,
        error: false,
      };

    case FETCH_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfo: action.payload,
        success: true,
        loading: false,
        error: false,
      };

    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
        success: true,
        loading: false,
        error: false,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        success: true,
        loading: false,
        error: false,
      };

    case UPDATE_IMAGE:
      return {
        ...state,
        userInfo: { ...state.userInfo, image: action.payload.image },
        success: true,
        loading: false,
        error: false,
      };

    case ERROR_STATE:
      return {
        ...state,
        success: false,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default profileReducer;
