function removeFinalSlash(url) {
  return typeof url === "string" && url[url.length - 1] === "/"
    ? url.substring(0, url.length - 1)
    : url;
}

function parseUrl(url) {
  const parts = url.match(/(https?:\/\/)([^/]*)(\/(.*)\/?)?/);
  if (parts) {
    return {
      raw: removeFinalSlash(url),
      protocol: parts[1],
      origin: parts[2],
      path: removeFinalSlash(parts[4]),
    };
  }
  return null;
}

export default parseUrl;
export { parseUrl, removeFinalSlash };
