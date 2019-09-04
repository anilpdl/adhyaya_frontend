const USER = {
  INDEX: '/users',
  ADD_USER: '/users/new',
};

const USER_INVITATIONS = {
  INDEX: '/user_invitation',
  EXPIRED: '/user_invitation/expired',
  INVITATION: '/user_invitation/token/:invitationId'
}

const ROUTES = {
  INDEX: '/',
  DASHBOARD: '/dashboard',
  ABOUT_US: '/about',
  CONTACT_US: '/contact',
  LOGIN: '/login',
  SERVICES: '/services',
  USERS: USER.INDEX,
  ADD_USERS: USER.ADD_USER,
  LIST_USERS: USER.INDEX,
  USER_INVITATIONS_INDEX: USER_INVITATIONS.INDEX,
  USER_INVITATIONS: USER_INVITATIONS.INVITATION,
  INVALID_INVITATION: USER_INVITATIONS.EXPIRED,
}

export default ROUTES;
