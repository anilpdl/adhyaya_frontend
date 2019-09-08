import axios from "axios";
import { unAuthenticatedResponseHandlerIncerceptor } from './interceptor';

export const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const FORM_DATA_HEADERS = {
  "Content-Type": "multipart/form-data"
};

// Intercept the response to perform any additional tasks.
axios.interceptors.response.use(
  response => response,
  unAuthenticatedResponseHandlerIncerceptor
);

class BaseRequest {
  static _headers(headers = DEFAULT_HEADERS) {
    return { headers };
  }

  static get(url) {
    return axios.get(url, this._headers());
  }

  static post(url, data) {
    return axios.post(url, data, this._headers());
  }

  static postFile(url, data) {
    return axios.post(url, data, this._headers(FORM_DATA_HEADERS));
  }

  static patch(url, data) {
    return axios.patch(url, data, this._headers());
  }

  static delete(url) {
    return axios.delete(url, this._headers());
  }
}

export default BaseRequest;
