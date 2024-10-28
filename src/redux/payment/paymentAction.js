import {
  INITIATE_STRIPE_PAYMENT,
  STRIPE_PAYMENT_SUCCESS,
  STRIPE_PAYMENT_FAILURE,
  NOTIFY_STRIPE_PAYMENT_SUCCESS,
  NOTIFY_STRIPE_PAYMENT_FAILURE,
  RESET_STRIPE_PAYMENT,
} from "./paymentType";
import { apiHelper } from "../apiHelper";
import { toast } from "react-toastify";
import { SERVER_ROUTE } from "../../config/route";
import { useValidator } from "../../helpers/hooks/useValidator";

// Initiate STRIPE Payment Action
export const processStripePayment = (orderDetails, token) => async (dispatch) => {
  dispatch({ type: INITIATE_STRIPE_PAYMENT });
  try {
    const res = await apiHelper(
      "post",
      SERVER_ROUTE.checkout,
      orderDetails,
      token
    );
    if (res?.status === 200 && res?.data?.txnid) {
      dispatch({
        type: STRIPE_PAYMENT_SUCCESS,
        payload: res?.data?.message || "STRIPE Payment Successful",
      });
      // toast.success(res?.data?.message || "STRIPE Payment Successful");
      return res?.data;
    } else {
      useValidator(res?.data);
      dispatch({
        type: STRIPE_PAYMENT_FAILURE,
        payload: res?.data?.message || "STRIPE Payment failed",
      });
      toast.error(res?.data?.message || "STRIPE Payment failed");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: STRIPE_PAYMENT_FAILURE,
      payload: "STRIPE Payment process encountered an error",
    });
    toast.error("STRIPE Payment process encountered an error");
  }
};

// Notify STRIPE Payment Success
export const notifyStripePayment = (txnid, token) => async (dispatch) => {
  try {
    const res = await apiHelper(
      "post",
      SERVER_ROUTE.notifyPayment,
      { metadata: { txnid } }, // Notify using txnid
      token
    );

    if (res?.status === 200 && res?.data?.status === 'success') {
      dispatch({
        type: NOTIFY_STRIPE_PAYMENT_SUCCESS,
        payload: res?.data?.message || "Payment notification succeeded",
      });
      toast.success(res?.data?.message || "Payment notification succeeded");
      return res?.data;
    } else {
      dispatch({
        type: NOTIFY_STRIPE_PAYMENT_FAILURE,
        payload: res?.data?.message || "Payment notification failed",
      });
      toast.error(res?.data?.message || "Payment notification failed");
    }
  } catch (error) {
    dispatch({
      type: NOTIFY_STRIPE_PAYMENT_FAILURE,
      payload: "Error in payment notification",
    });
    toast.error("Error in payment notification");
  }
};

// Reset STRIPE Payment Action
export const resetSTRIPEPayment = () => (dispatch) => {
  dispatch({ type: RESET_STRIPE_PAYMENT });
};
