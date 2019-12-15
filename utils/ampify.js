require('dotenv').config()

const ampScript = `<script async src="https://cdn.ampproject.org/v0.js"></script>`
const ampAnalyticsScript = `<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`
const ampBoilerplate = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
const ampAnalytics = `<amp-analytics type="gtag" data-credentials="include"><script type="application/json">{"vars":{"gtag_id":"${process.env.GOOGLE_ANALYTICS}","config":{"${process.env.GOOGLE_ANALYTICS}":{"groups":"default"}}}}</script></amp-analytics>`

export default (html) => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡')

  // Combine css into single tag
  let styleConcat = ''
  html = html.replace(
    /<style[^>]*data-vue-ssr[^>]*>([\s\S]*?)<\/style>/gi,
    (match, sub) => {
      styleConcat += sub
      return ''
    }
  )
  html = html.replace(
    '</head>',
    `<style amp-custom>${styleConcat}</style></head>`
  )

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '')

  // Remove amphtml tag
  // html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, "");

  // Remove JS script tags except for ld+json
  html = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    (match) => {
      return /application\/ld\+json/gi.test(match) ? match : ''
    }
  )

  // Replace img tags with amp-img
  html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
    sub = sub.replace(/data-src/gi, 'src')
    sub = sub.replace(/data-srcset/gi, 'srcset')
    return `<amp-img ${sub} layout=intrinsic></amp-img>`
  })

  // Remove all picture and source tag
  html = html.replace(/<picture[^>]*>([\s\S]*?)<\/picture>/gi, '$1')
  html = html.replace(/<source[^>]*>/gi, '')

  // Add /amp endfix for all internal link
  // html = html.replace(
  //   /<a([^>]*?)href\s*=\s*(['"])(\/[^\2]*?)\2\1*>/gi,
  //   `<a href="$3/amp">`
  // )

  // Remove data attributes from tags
  html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '')

  // Add AMP script before </head>
  html = html.replace('<head>', `<head>${ampScript}${ampAnalyticsScript}`)
  html = html.replace('</head>', `${ampBoilerplate}</head>`)
  html = html.replace('</body>', `${ampAnalytics}</body>`)

  return html
}
