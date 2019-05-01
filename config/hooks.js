import ampify from "../plugins/ampify";

export default {
  // This hook is called before saving the html to flat file
  "generate:page": page => {
    if (page.route.includes("amp")) {
      page.html = ampify(page.html);
    }
  },
  // This hook is called before serving the html to the browser
  "render:route": (url, page, { req, res }) => {
    if (url.includes("amp")) {
      page.html = ampify(page.html);
    }
  }
};
