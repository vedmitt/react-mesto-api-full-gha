import { serverUrl } from "./constants";

const headers = {
  "Content-Type": "application/json"
}

const _request = (url, options) => {
  return fetch(url, options)
    .then(res => {
      return _getResponseData(res);
    })
}

const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (password, email) => {
  return _request(`${serverUrl}/signup`, {
    headers: {
      "Accept": "application/json",
      ...headers
    },
    method: 'POST',
    body: JSON.stringify({ password, email })
  });
};

export const login = (password, email) => {
  return _request(`${serverUrl}/signin`, {
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      ...headers
    },
    method: 'POST',
    body: JSON.stringify({ password, email })
  });
};

export const logout = () => {
  return _request(`${serverUrl}/signout`, {
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      ...headers
    },
    method: 'GET'
  });
}

export const validateToken = () => {
  return _request(`${serverUrl}/users/me`, {
    credentials: 'include',
    method: 'GET'
  });
};