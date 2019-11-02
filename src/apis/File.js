import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/file`,
  FETCH: `${apiUrlConfig.apiEndPoint()}/file/:fileId`,
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

  static getDetails(fileId) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH, fileId);
    return AuthenticatedRequestService.get(INDEX_URL);
  }

  static approveFile(fileId, approverId) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH, fileId);
    return AuthenticatedRequestService.post(INDEX_URL, { approverId });
  }

  static deleteFile(id) {
    const INDEX_URL = insertIdToUrl(URLS.FETCH, id);
    return AuthenticatedRequestService.delete(INDEX_URL);
  }
}

export default FileApi;
