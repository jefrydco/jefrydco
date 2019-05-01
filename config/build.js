import path from "path";
import MarkdownIt from "markdown-it";
// import hljs from "highlight.js";
import mip from "markdown-it-prism";
import miv from "markdown-it-video";
import mila from "markdown-it-link-attributes";
import mia from "markdown-it-anchor";
import mitdr from "markdown-it-toc-done-right";
import slugify from "@sindresorhus/slugify";

import miri from "../plugins/markdown-it-responsive-image";
import { isDev } from "./utils";
import { miriConf } from "./config";

const md = new MarkdownIt({
  html: true,
  typographer: true
});
md.use(mip);
md.use(miv);
md.use(miri, miriConf);
md.use(mila, {
  pattern: /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/,
  attrs: {
    target: "_blank",
    rel: "noopener noreferrer"
  }
});
md.use(mia, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: "🔗",
  slugify
});
md.use(mitdr, {
  slugify
});

export default {
  parallel: isDev,
  cache: isDev,
  hardSource: isDev,
  postcss: {
    plugins: {
      tailwindcss: path.resolve("./tailwind.js"),
      "postcss-mixins": {},
      "postcss-simple-vars": {},
      "postcss-nested": {}
    },
    preset: { autoprefixer: { grid: true } }
  },
  extend(config, { isDev, isClient }) {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        vue: true,
        markdown(body) {
          return md.render(body);
        }
      }
    });
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true
        }
      });
    }
  }
};
