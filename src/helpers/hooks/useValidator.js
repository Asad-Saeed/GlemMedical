import { toast } from "react-toastify";

export const useValidator = (data) => {
  if (data?.data) {
    Object.values(data?.data)?.forEach((errors) => {
      errors?.forEach((error) => toast.error(error));
    });
  } else if (data?.message) {
    toast.error(data?.message);
  }
};
