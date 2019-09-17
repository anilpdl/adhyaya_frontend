import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/dashboard`
};

class DashboardApi {

  static getDetails() {
    return AuthenticatedRequestService.get(URLS.INDEX);
  }
}

export default DashboardApi;
