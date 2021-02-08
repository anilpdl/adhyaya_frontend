export const insertIdToUrl = (url, id) => {
  return url.replace(/:id|:userId|:userInvitationId|:fileId/, id);
}

export const fetchQueryParams = (url) => {
  if (url) {
    return parseInt(url.replace('?', '').split('=')[1]);
  }

  return url;
}
