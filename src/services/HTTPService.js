import axios from "axios";
import logger from "./LogService";
// import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {

  // console.log ("Axios Interceptor");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    console.error("Unable to connect to service. An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
