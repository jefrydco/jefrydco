import { isDev } from "../helpers";

// Taken from: https://stackoverflow.com/a/23816083/7711812
export default (req, res, next) => {
  if (!isDev && req.headers.host.slice(0, 4) === "www.") {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  next();
};
