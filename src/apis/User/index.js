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
  USER_AVATAR: `${apiUrlConfig.apiEndPoint()}/user/:userId/avatar`,
  FORGET_PASSWORD: `${apiUrlConfig.apiEndPoint()}/user/forgot_password`,
  RESET_PASSWORD: `${apiUrlConfig.apiEndPoint()}/user/reset_password`,
  SUBSCRIBE: `${apiUrlConfig.apiEndPoint()}/user/subscribe`
};

class UserApi {

  static create(data) {
    return UnAuthenticatedRequestService.post(URLS.CREATE, data);
  }

  static getAll() {
    return AuthenticatedRequestService.get(URLS.FETCH_ALL);
  }

  static changePassword(data, userId) {
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

  static uploadAvatar(data, userId) {
    const INDEX_URL = insertIdToUrl(URLS.USER_AVATAR, userId);
    return AuthenticatedRequestService.postFile(INDEX_URL, data)
  }

  static forgotPassword(email) {
    return UnAuthenticatedRequestService.post(URLS.FORGET_PASSWORD, email);
  }

  static resetPassword(token, password) {
    return UnAuthenticatedRequestService.post(URLS.RESET_PASSWORD, { password, token });
  }

  static subscribe(email) {
    return UnAuthenticatedRequestService.post(URLS.SUBSCRIBE, { email });
  }
}

export default UserApi;
