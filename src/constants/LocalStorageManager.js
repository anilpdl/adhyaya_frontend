
const TOKEN = 'token';

function saveToLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function getFromLocalStorage(name) {
  return localStorage.getItem(name);
}

function deleteFromLocalStorage(name) {
  localStorage.removeItem(name);
}

export function setObject(objectName, object) {
  localStorage.setItem(objectName, JSON.stringify(object));
}

export function getObject(objectName) {
  const object = localStorage.getItem(objectName);
  return JSON.parse(object);
}

export function setToken(token) {
  saveToLocalStorage(TOKEN, token)
}

export function getToken() {
  return getFromLocalStorage(TOKEN);
}

export function clear() {
  return localStorage.clear();
}
