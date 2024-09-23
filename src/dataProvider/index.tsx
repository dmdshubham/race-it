import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { default as axios } from "../services/AxiosInterceptor";

// Define a type for the log configuration
interface LogConfig {
  log: boolean;
}

// Define a type for the axios instance type
type AxiosInstanceType = "ssr" | "default";

// Function to fetch the appropriate axios instance
const fetchAxiosInstanceType = (type: any): AxiosInstance => {
  switch (type) {
    case "ssr":
      return axios;
    default:
      return axios;
  }
};

const fetcher = {
  /**
   * @function get To fetch a resource
   * @param {string} url api path
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  get: async (
    url: string,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
    logConfigs: LogConfig = { log: false },
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    if (logConfigs.log)
      console.log(`url=>${url} paramConfig=>${JSON.stringify(paramConfigs)}`);
    return instance
      .request({
        url,
        method: "GET",
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * @function post To create a resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  post: async (
    url: string,
    data: any,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: "POST",
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * @function put To update a full data of resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  put: async (
    url: string,
    data: any,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: "PUT",
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * @function patch To update partial data of a resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  patch: async (
    url: string,
    data: any,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: "PATCH",
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * @function delete To delete the resource
   * @param {string} url api path
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  delete: async (
    url: string,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: "DELETE",
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * @function upload To upload a file
   * @param {string} url api path
   * @param {FormData} formData Form data to send
   * @param {object} paramConfigs axios parameters
   * @param {AxiosInstanceType} axiosInstanceType axios instance type
   * @returns Promise
   */
  upload: async (
    url: string,
    formData: FormData,
    paramConfigs: AxiosRequestConfig = {},
    axiosInstanceType: AxiosInstanceType = "default",
  ): Promise<AxiosResponse> => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: "PUT",
        data: formData,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default fetcher;
