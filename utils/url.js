import urlParse from 'url-parse';

export function maybeAddProtocol(url, defaultProtocol = 'https') {
  let parsed = urlParse(url);
  if (!parsed.protocol) {
    parsed.set('protocol', defaultProtocol);
    parsed.set('slashes', true);
  }

  return parsed.toString();
}

export function getHostname(url) {
  return urlParse(maybeAddProtocol(url)).hostname || url;
}
