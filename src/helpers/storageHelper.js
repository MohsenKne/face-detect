export const storageHelper = (function () {
  const _token_param_name = "0b7cf3993692129143fc015bf1f806b5";
  function setApiToken(token) {
    localStorage.setItem(_token_param_name, token);
  }
  function getApiToken() {
    return localStorage.getItem(_token_param_name);
  }
  function removeApiToken() {
    localStorage.removeItem(_token_param_name);
  }

  return {
    setApiToken,
    getApiToken,
    removeApiToken,
  };
})();
