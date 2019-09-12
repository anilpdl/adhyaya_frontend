import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/user/signin`,
  CREATE: `${apiUrlConfig.apiEndPoint()}/user/signup`,
  FETCH_ALL: `${apiUrlConfig.apiEndPoint()}/user/all`,
  FETCH_URL: `${apiUrlConfig.apiEndPoint()}/user/:userId`,
  CHANGE_PASSWORD: `${apiUrlConfig.apiEndPoint()}/user/:userId/password`,
};

class UserApi {

  static create(data) {
    return UnAuthenticatedRequestService.post(URLS.CREATE, data);
  }

  static getAll() {
    return AuthenticatedRequestService.get(URLS.FETCH_ALL);
  }

  static changePassword(data, userId) {
    console.log(data)
    const URL = insertIdToUrl(URLS.CHANGE_PASSWORD, userId);
    return AuthenticatedRequestService.post(URL, data);
  }

  static update(data, userId) {
    const URL = insertIdToUrl(URLS.FETCH_URL, userId);
    return AuthenticatedRequestService.post(URL, data);
  }
  /**
   * get user detail
   */
  static getDetails(userId) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH_URL, userId);
    return AuthenticatedRequestService.get(INDEX_URL);
  }
  /**
   * gets all users
   */
  static logIn(data) {
    return UnAuthenticatedRequestService.post(URLS.INDEX, data);
  }
}

export default UserApi;
