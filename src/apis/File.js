import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/file`,
  UPLOAD: `${apiUrlConfig.apiEndPoint()}/user/:userId/file`,
};

class FileApi {

  static upload(data, userId) {
    const INDEX_URL = insertIdToUrl(URLS.UPLOAD, userId);
    return AuthenticatedRequestService.postFile(INDEX_URL, data);
  }

  static getAll() {
    return AuthenticatedRequestService.get(URLS.INDEX);
  }

  static getDetails(invitationId) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH_URL, invitationId);
    return UnAuthenticatedRequestService.get(INDEX_URL);
  }

  static resendInvitation(id) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH_URL, id);
    return AuthenticatedRequestService.post(INDEX_URL);
  }

  static deleteInvitation(id) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH_URL, id);
    return AuthenticatedRequestService.delete(INDEX_URL);
  }
}

export default FileApi;
