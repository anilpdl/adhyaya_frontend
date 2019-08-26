import * as LocalStorageManager from "../constants/LocalStorageManager";

export const isUserAuthenticated = () => {
  const user = LocalStorageManager.getUserObject();
  const token = LocalStorageManager.getToken();
  console.log(!!(user && token))
  return !!(user && token);
}