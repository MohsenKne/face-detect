import { ApiPrototype } from ".";
import { env } from "../config";
import axios from "axios";

ApiPrototype.login = function ({ username, password }) {
  return this.apiCall.post(env._BACKEND_BASE_URL + "accounts/login", {
    engine: (url, option) =>
      axios.post(url, option.body, { headers: option.headers }),
    body: {
      username,
      password,
    },
    disableToken: true,
    method: "POST",
  });
};

ApiPrototype.getUsers = function () {
  return this.apiCall.get(env._BACKEND_BASE_URL + "api/admin/users/", {
    engine: (url, option) =>
      axios.get(url, {
        headers: option.headers,
      }),
    method: "GET",
  });
};

ApiPrototype.setUser = function ({ formData }) {
  return this.apiCall.post(env._BACKEND_BASE_URL + "api/admin/users/", {
    engine: (url, option) =>
      axios.post(url, option.body, { headers: option.headers }),
    body: formData,
    method: "POST",
  });
};

ApiPrototype.getVerify = function ({ formData }) {
  return this.apiCall.post(env._BACKEND_BASE_URL + "api/admin/verification/", {
    engine: (url, option) =>
      axios.post(url, option.body, { headers: option.headers }),
    body: formData,
    method: "POST",
  });
};
