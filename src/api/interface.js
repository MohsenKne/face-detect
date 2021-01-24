import path from "path";
import { parseUrl, checkConnection } from "../helpers";
import { env } from "../config";

const baseUrl = env._BACKEND_BASE_URL;
const baseUrlParts = parseUrl(baseUrl);

if (!baseUrlParts) {
  throw new Error(
    "miss configured backend logic base ulr >>> BACKEND_BASE_URL"
  );
}

const baseUrlProtocol = baseUrlParts.protocol;
const baseUrlDomainAndPath = `${baseUrlParts.origin}/${baseUrlParts.path}`;

function httpMethodFactory(interfaceObject, httpVerb) {
  interfaceObject.apiCall[httpVerb] = function (url, options = {}) {
    checkConnection();
    options.method = httpVerb.toUpperCase();
    return interfaceObject.apiCall(url, options);
  };
}

function ApiInterface(apiOptions = {}) {
  this.options = apiOptions;

  this.apiCall = async (url, options = {}) => {
    const token =
      this.options.getToken && !options.disableToken
        ? await this.options.getToken()
        : null;

    options.headers = options.headers || {};

    if (token) {
      options.headers.Authorization = `${token}`;
    }

    const engine = options.engine;

    return engine(url, options).catch((error) => {
      throw error;
    });
  };

  httpMethodFactory(this, "get");
  httpMethodFactory(this, "post");
  httpMethodFactory(this, "put");
  httpMethodFactory(this, "delete");
  httpMethodFactory(this, "head");
}

ApiInterface.prototype.fromBaseUrl = function (apiPath) {
  return baseUrlProtocol + path.join(baseUrlDomainAndPath, apiPath);
};

const ApiPrototype = ApiInterface.prototype;

function createApiInterface(options) {
  return new ApiInterface(options);
}

export default createApiInterface;

export { ApiPrototype, createApiInterface };
