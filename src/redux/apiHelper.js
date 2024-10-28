import axios from "axios";
import { ENV } from "../config/config";
import { toast } from "react-toastify";

let baseUrl = ENV.serverUrl;

async function apiHelper(apiType, path, data = null, token = null) {
  if (!baseUrl) {
    baseUrl = "";
  }

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios({
      method: apiType,
      url: `${baseUrl + path}`,
      data,
      headers,
    });
    return response;
  } catch (error) {
    if (error) {
      toast.error(error.response.data.message || "An error occurred");
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
}

export { apiHelper };
