import axios from "axios";
import { unAuthenticatedResponseHandlerIncerceptor } from './interceptor';

export const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

// Intercept the response to perform any additional tasks.
axios.interceptors.response.use(
  response => response,
  unAuthenticatedResponseHandlerIncerceptor
);

class BaseRequest {
  static _headers() {
    return { headers: DEFAULT_HEADERS };
  }

  static get(url) {
    return axios.get(url, this._headers());
  }

  static post(url, data) {
    return axios.post(url, data, this._headers());
  }

  static patch(url, data) {
    return axios.patch(url, data, this._headers());
  }

  static delete(url) {
    return axios.delete(url, this._headers());
  }
}

export default BaseRequest;
