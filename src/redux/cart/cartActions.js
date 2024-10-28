import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ERROR_STATE,
  RESET_CART,
} from "./cartTypes";
import { apiHelper } from "../apiHelper";
import { SERVER_ROUTE } from "../../config/route";
import { toast } from "react-toastify";
import { useValidator } from "../../helpers/hooks/useValidator";

// Fetch Cart Action
export const fetchCart = (token) => async (dispatch) => {
  try {
    const res = await apiHelper("get", SERVER_ROUTE.get_cart, null, token);
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({
        type: FETCH_CART,
        payload: {
          cart: res?.data?.cart,
          cart_details: res?.data?.cart_details,
        },
      });
    } else {
      useValidator(res?.data);
      dispatch({
        type: ERROR_STATE,
        payload: { error: "Failed to fetch cart" },
      });
      toast.error(res?.data?.message || "Failed to fetch cart");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_STATE, payload: { error: "Failed to fetch cart" } });
  }
};

// Add to Cart Action
export const addToCart = (item, token) => async (dispatch) => {
  try {
    const res = await apiHelper(
      "post",
      `${SERVER_ROUTE.add_to_cart}${item}`,
      null,
      token
    );
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({
        type: ADD_TO_CART,
        payload: res?.data,
      });
      toast.success(res?.data?.message || "Item added to cart");
    } else {
      if (res?.status === 401) {
        navigator("/login");
      }
      useValidator(res?.data);
      dispatch({
        type: ERROR_STATE,
        payload: { error: "Failed to add item to cart" },
      });
      toast.error(res?.data?.message || "Failed to add item to cart");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ERROR_STATE,
      payload: { error: "Failed to add item to cart" },
    });
  }
};

// Remove from Cart Action
export const removeFromCart = (id, token) => async (dispatch) => {
  try {
    const res = await apiHelper(
      "delete",
      SERVER_ROUTE.remove_from_cart,
      { id: id },
      token
    );
    if (res?.status === 200 && res?.data?.status === 1) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { itemId: id, cart_details: res?.data?.cart_details },
      });
      toast.success(res?.data?.message || "Item removed from cart");
      dispatch(fetchCart(token));
    } else {
      useValidator(res?.data);
      dispatch({
        type: ERROR_STATE,
        payload: { error: "Failed to remove item from cart" },
      });
      toast.error(res?.data?.message || "Failed to remove item from cart");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ERROR_STATE,
      payload: { error: "Failed to remove item from cart" },
    });
  }
};

// Reset Cart Action
// export const resetCart = () => {
//   return {
//     type: RESET_CART,
//   };
// };

export const clearCart = (id, token) => async (dispatch) => {
  try {
    const res = await apiHelper(
      "delete",
      SERVER_ROUTE.remove_from_cart,
      { id: id },
      token
    );
    if (res?.status === 200 && res?.data?.status === 1) {
      return res?.data;
    } else {
      useValidator(res?.data);
      dispatch({
        type: ERROR_STATE,
        payload: { error: "Failed to remove item from cart" },
      });
      toast.error(res?.data?.message || "Failed to remove item from cart");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ERROR_STATE,
      payload: { error: "Failed to remove item from cart" },
    });
  }
};

export const resetCart = (cartList, token) => async (dispatch) => {
  try {
    // Remove all items from the cart
    const removePromises = Object.keys(cartList)?.map((id) =>
      dispatch(clearCart(id, token))
    );
    await Promise.all(removePromises);

    // Reset the cart state to empty
    dispatch({
      type: RESET_CART,
      payload: {
        cart: {},
        cart_details: {
          cart_total: 0,
          tax: 0,
          total_amount: 0,
        },
      },
    });

    toast.success("Cart has been successfully reset");
  } catch (error) {
    console.error("Failed to reset cart:", error);
    dispatch({ type: ERROR_STATE, payload: { error: "Failed to reset cart" } });
    toast.error("Failed to reset cart");
  }
};
