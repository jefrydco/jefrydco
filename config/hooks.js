import { ampify } from '../utils'

export default {
  // This hook is called before saving the html to flat file
  'generate:page': (page) => {
    if (/\/amp((\/.*$)|$)/gi.test(page.route)) {
      page.html = ampify(page.html)
    }
  },
  // This hook is called before serving the html to the browser
  'render:route': (url, page, { req, res }) => {
    if (/\/amp((\/.*$)|$)/gi.test(url)) {
      page.html = ampify(page.html)
    }
  }
}
