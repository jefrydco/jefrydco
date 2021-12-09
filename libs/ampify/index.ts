import DotEnv from 'dotenv'
import { getYoutubeIdFromThumbnail } from '~/utils'

DotEnv.config()

const ampScript = `<script async src="https://cdn.ampproject.org/v0.js"></script>`
const ampAnalyticsScript = `<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`
const ampVideoScript = `<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>`
const ampYoutubeScript = `<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>`
const ampBoilerplate = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
const ampAnalytics = `<amp-analytics type="gtag" data-credentials="include"><script type="application/json">{"vars":{"gtag_id":"${process.env.GOOGLE_ANALYTICS}","config":{"${process.env.GOOGLE_ANALYTICS}":{"groups":"default"}}}}</script></amp-analytics>`
const colorMap = {
  '--bg': '#1f2937',
  '--bg-disabled': '#6b7280',
  '--text-normal': '#d1d5db',
  '--text-disabled': '#9ca3af',
  '--text-title': '#e5e7eb',
  '--text-link': '#fbbf24',
  '--card-bg': '#4b5563',
  '--inline-code-bg': '#111827',
  '--inline-code-border': '#1f2937',
  '--inline-code-text': '#d1d5db',
  '--error': '#f87171'
} as Record<string, string>

export default (html: string) => {
  const isHasVideo = html.match(/<video([^>]*)>/gi)
  const isHasYoutube = html.match(
    /<figure aria-label="YouTube Video"[\s\S]*?>([\s\S]*?)<\/figure>/gi
  )

  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡')

  // Combine css into single tag
  let styleConcat = ''
  html = html.replace(
    /<style[^>]*data-vue-ssr[^>]*>([\s\S]*?)<\/style>/gi,
    (_match, sub) => {
      styleConcat += sub
      return ''
    }
  )

  // Remove media query. Regex taken from: https://stackoverflow.com/a/27616920
  styleConcat = styleConcat.replace(/@media[^{]+\{([\s\S]+?\})\s*\}/gi, '')

  Object.keys(colorMap).forEach((colorKey) => {
    styleConcat = styleConcat.replace(
      new RegExp(`var\\(${colorKey}\\)`, 'gi'),
      colorMap[colorKey]
    )
  })

  // RegEx taken from: https://stackoverflow.com/a/2694121
  styleConcat.replace(
    /(?<selector>(?:(?:[^,{]+),?)*?)\{(?:(?<name>[^}:]+):?(?<value>[^};]+);?)*?\}/gi,
    (m) => {
      if (m.includes('tooltip') || m.includes('!important')) {
        styleConcat = styleConcat.replace(m, '')
      }
      return ''
    }
  )

  html = html.replace(
    '</head>',
    `<style amp-custom>${styleConcat}</style></head>`
  )

  // Remove preload and prefetch tags
  html = html.replace(
    /<link[^>]*rel="(?:preload|prefetch|modulepreload)?"[^>]*>/gi,
    ''
  )

  // Remove amphtml tag
  html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, '')

  // Remove JS script tags except for ld+json
  html = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    (match) => {
      return /application\/ld\+json/gi.test(match) ? match : ''
    }
  )

  // Replace img tags with amp-img
  html = html.replace(/<img([^>]*)>/gi, (_match, sub: string) => {
    if (/data-src="([^"]*)"/gi.exec(sub)?.length) {
      sub = sub.replace(/(?<!data-)src="(data:image\/[^;]+;base64[^"]+)"/gi, '')
    }
    sub = sub.replace(/data-src/gi, 'src')
    sub = sub.replace(/data-srcset/gi, 'srcset')
    return `<amp-img ${sub} layout=intrinsic></amp-img>`
  })

  // Replace video tags with amp-video
  if (isHasVideo) {
    html = html.replace(/<div class="embed[\s\S]*?">([\s\S]*?)<\/div>/gi, '$1')
    html = html.replace(/<video([^>]*)>/gi, (_match, sub) => {
      const isMuted = sub.match(/muted/gi)
      const isPlaysInline = sub.match(/playsinline/gi)
      if (isPlaysInline) {
        sub = sub.replace(/playsinline/gi, '')
      }
      return `<amp-video ${sub}${
        isMuted ? 'noaudio' : ''
      } layout=responsive width=736 height=446></amp-video>`
    })
  }

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

  // Replace youtube with amp-youtube
  if (isHasYoutube) {
    html = html.replace(
      /<div class="td__video-sizer"[\s\S]*?>([\s\S]*?)(<\/figure>)<\/div>/gi,
      (_match, sub) => {
        const youtubeUrl = /src="([^"]*)"/gi.exec(sub)?.[1] || ''
        // RegEx taken from: https://stackoverflow.com/a/7882155/7711812
        const youtubeId = /\/vi\/(.*)\//gi.exec(youtubeUrl)?.[1] || ''
        console.log(youtubeId)
        return `<amp-youtube data-videoid="${youtubeId}" layout=responsive width=736 height=446><amp-img src="${youtubeUrl}" layout=fill placeholder/></amp-youtube>`
      }
    )
  }

  // Remove switch illustration
  html = html.replace(/<div class="td__switch-illustration">([\s\S]*?)<\/div>/gi, '')

  // Add AMP script before </head>
  html = html.replace(
    '<head>',
    `<head>${ampScript}${ampAnalyticsScript}${
      isHasVideo ? ampVideoScript : ''
    }${isHasYoutube ? ampYoutubeScript : ''}`
  )
  html = html.replace('</head>', `${ampBoilerplate}</head>`)
  html = html.replace('</body>', `${ampAnalytics}</body>`)

  return html
}
