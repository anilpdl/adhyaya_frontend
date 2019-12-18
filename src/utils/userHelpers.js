import * as LocalStorageManager from '../constants/LocalStorageManager';
import { USERS } from '../constants';

export const isUserAuthenticated = () => {
  const user = LocalStorageManager.getUserObject();
  const token = LocalStorageManager.getToken();
  return !!(user && token);
};

export const isAdminAccount = () => {
  const { role } = LocalStorageManager.getUserObject() || {};

  return role === USERS.ADMIN;
};
