import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/user/signin`
};

class UserApi {

  /**
   * gets all users
   */
  static logIn(data) {
    return UnAuthenticatedRequestService.post(URLS.INDEX, data);
  }
}

export default UserApi;
