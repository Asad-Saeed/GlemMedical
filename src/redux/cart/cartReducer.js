import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ERROR_STATE,
  RESET_CART,
} from "./cartTypes";

const initialState = {
  cartList: {},
  cartDetails: {
    cart_total: 0,
    tax: 0,
    total_amount: 0,
  },
  loading: true,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        cartList: action.payload.cart || {},
        cartDetails: action.payload.cart_details || {
          cart_total: 0,
          tax: 0,
          total_amount: 0,
        },
        loading: false,
        error: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          ...action.payload.cart,
        },
        cartDetails: action.payload.cart_details || state.cartDetails,
        loading: false,
        error: false,
      };

    case REMOVE_FROM_CART:
      const updatedCartList = { ...state.cartList };
      delete updatedCartList[action.payload.itemId];
      return {
        ...state,
        cartList: updatedCartList,
        cartDetails: action.payload.cart_details || state.cartDetails,
        loading: false,
        error: false,
      };

    case RESET_CART:
      return {
        ...state,
        cartList: {},
        cartDetails: {
          cart_total: 0,
          tax: 0,
          total_amount: 0,
        },
        loading: false,
        error: false,
      };

    case ERROR_STATE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default cartReducer;
