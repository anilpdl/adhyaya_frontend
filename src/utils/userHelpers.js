import * as LocalStorageManager from "../constants/LocalStorageManager";

export const isUserAuthenticated = () => {
  const user = LocalStorageManager.getUserObject();
  const token = LocalStorageManager.getToken();
  return !!(user && token);
}
