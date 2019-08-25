import BaseRequest, {DEFAULT_HEADERS} from './Base'

class AuthenticatedRequestService extends BaseRequest{
  static _authenticatedHeaders() {
    const _auth_header = { Authorization: localStorage.getItem("token") };
    const headers = Object.assign({}, DEFAULT_HEADERS, _auth_header);
    return headers;
  }

  static _headers(){
    return { headers: this._authenticatedHeaders() }
  }
}

export default AuthenticatedRequestService;
