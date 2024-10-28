import {
  INITIATE_STRIPE_PAYMENT,
  STRIPE_PAYMENT_SUCCESS,
  STRIPE_PAYMENT_FAILURE,
  NOTIFY_STRIPE_PAYMENT_SUCCESS,
  NOTIFY_STRIPE_PAYMENT_FAILURE,
  RESET_STRIPE_PAYMENT,
} from "./paymentType";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_STRIPE_PAYMENT:
      return {
        ...state,
        loading: true,
        successMessage: null,
        errorMessage: null,
      };

    case STRIPE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        errorMessage: null,
      };

    case STRIPE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload,
      };
      case NOTIFY_STRIPE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        errorMessage: null,
      };

    case NOTIFY_STRIPE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload,
      };

    case RESET_STRIPE_PAYMENT:
      return initialState;

    default:
      return state;
  }
};

export default paymentReducer;
