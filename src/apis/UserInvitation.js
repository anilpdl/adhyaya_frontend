import apiUrlConfig from "configs/apiUrlConfig";
import UnAuthenticatedRequestService from "services/requests/UnAuthenticated";
import AuthenticatedRequestService from "services/requests/Authenticated";
import { insertIdToUrl } from "utils/routes";

const URLS = {
  INDEX: `${apiUrlConfig.apiEndPoint()}/user_invitations/new`,
  FETCH_ALL: `${apiUrlConfig.apiEndPoint()}/user_invitations/all`,
  FETCH_URL: `${apiUrlConfig.apiEndPoint()}/user_invitations/:userInvitationId`,
};

class UserInvitationApi {

  static create(data) {
    return AuthenticatedRequestService.post(URLS.INDEX, data);
  }

  static getAll() {
    return AuthenticatedRequestService.get(URLS.FETCH_ALL);
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

export default UserInvitationApi;
