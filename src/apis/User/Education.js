import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/education/:id`,
  ADD: `${apiUrlConfig.apiEndPoint()}/education/:id/add`,
  UPDATE: `${apiUrlConfig.apiEndPoint()}/education/:id/update`,
  FETCH: `${apiUrlConfig.apiEndPoint()}/user/:userId/education`,
};

class EducationApi {

  static getAll(userId) {
    const URL = insertIdToUrl(URLS.FETCH, userId);
    return AuthenticatedRequestService.get(URL);
  }

  static addNew(data, userId) {
    const URL = insertIdToUrl(URLS.ADD, userId);
    return AuthenticatedRequestService.post(URL, data);
  }

  static update(data, id) {
    const URL = insertIdToUrl(URLS.UPDATE, id);
    return AuthenticatedRequestService.post(URL, data);
  }

  static delete(id) {
    const URL = insertIdToUrl(URLS.INDEX, id);
    return AuthenticatedRequestService.delete(URL);
  }
}

export default EducationApi;
