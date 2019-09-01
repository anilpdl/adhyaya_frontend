import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "../../utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/user/signin`,
  INVITE: `${apiUrlConfig.apiEndPoint()}/user`,
  FETCH_URL: `${apiUrlConfig.apiEndPoint()}/user/:userId`,
};

class UserApi {

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
