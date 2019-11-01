export const insertIdToUrl = (url, id) => {
  return url.replace(/:id|:userId|:userInvitationId|:fileId/, id);
}