/* eslint-disable no-loop-func */
import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../constants/config.js";
import { getAccessToken, getType } from "../utils/common-utils.js";

const API_URL = "http://localhost:8000";
///common api interceptors
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "connect-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);
/////////////////////////////////

// if success=> return{isSuccess:true, data:object}
// if fail => return {isFailure:true, status :string, msg:string, code:int}
///////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.response) {
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: "",
    };
  } else {
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: "500",
      display: "Network Error",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      // eslint-disable-next-line no-undef
      TYPE: getType(value, body),

      onUploadProgress: function (processEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (processEvent.loaded * 100) / processEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      showDownloadProgress: function (processEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (processEvent.loaded * 100) / processEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
