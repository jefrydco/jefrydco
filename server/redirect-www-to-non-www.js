import { isDev } from "../helpers";

// Taken from: https://stackoverflow.com/a/23816083/7711812
export default (req, res, next) => {
  const host = req.headers.host;
  const url = req.url;
  const canonicalDomain = "jefrydco.id";

  if (!isDev && host !== canonicalDomain) {
    res.writeHead(301, { Location: `https://${canonicalDomain}${url}` });
    return res.end();
  }

  return next();
};
