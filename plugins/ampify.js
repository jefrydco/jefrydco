const ampScript =
  '<script async src="https://cdn.ampproject.org/v0.js"></script>';
const ampBoilerplate =
  "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>";

export default html => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, "<html ⚡");

  // Combine css into single tag
  let styleConcat = "";
  html = html.replace(
    /<style[^>]*data-vue-ssr[^>]*>([\s\S]*?)<\/style>/gi,
    (match, sub) => {
      styleConcat += sub;
      return "";
    }
  );
  html = html.replace(
    "</head>",
    `<style amp-custom>${styleConcat}</style></head>`
  );

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, "");

  // Remove amphtml tag
  html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, "");

  // Remove JS script tags except for ld+json
  html = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    match => {
      return /application\/ld\+json/gi.test(match) ? match : "";
    }
  );

  // Replace img tags with amp-img
  // html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
  //   return `<amp-img ${sub} layout=intrinsic></amp-img>`;
  // });

  html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
    let imgPath = null;
    if (/lazy/.test(match)) {
      sub = sub.replace(
        /(src|(?<!data-)srcset)\s*=\s*(['"])([^\2]*?)(['"])/gi,
        (srcMatch, srcSub) => {
          let url = srcMatch.split(`"`)[1];
          url = url.substring(0, url.indexOf("?"));
          imgPath = url;
          return "";
        }
      );
      sub = sub.replace(/data-srcset/gi, "srcset");
    }
    if (imgPath !== null) {
      return `<amp-img src="${imgPath}" ${sub} layout=intrinsic></amp-img>`;
    }
    return `<amp-img ${sub} layout=intrinsic></amp-img>`;
  });

  html = html.replace(/<source([^>]*)>/gi, (match, sub) => {
    sub = sub.replace(/(?<!data-)srcset\s*=\s*(['"])([^\2]*?)(['"])/gi, "");
    sub = sub.replace(/data-srcset/gi, "srcset");
    return `<source ${sub}>`;
  });

  // Add /amp prefix for all internal link
  // TODO: Add exception for i18n link
  html = html.replace(
    /<a([^>]*?)href\s*=\s*(['"])(\/[^\2]*?)\2\1*>/gi,
    `<a href="$3/amp">`
  );

  // Remove data attributes from CSS selector
  // TODO: Refine regex to replace the CSS declaration as well
  html = html.replace(/((#|\.)?[\w-]+)?(\[data(-\w+)+\])/gi, "");

  // Remove data attributes from tags
  html = html.replace(/\s*data-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, "");

  // Add AMP script before </head>
  html = html.replace("</head>", ampScript + ampBoilerplate + "</head>");

  return html;
};
