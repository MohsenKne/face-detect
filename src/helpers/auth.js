import { storageHelper } from ".";

export function isAuthenticated() {
  return !!storageHelper.getApiToken();
}
