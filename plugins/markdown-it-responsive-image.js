import qs from "qs";

const imageResponsive = (md, options) => {
  return (tokens, idx, opt, env, self) => {
    return renderResponsive(md, tokens, idx, opt, env, self, options);
  };
};

const renderResponsive = (md, tokens, idx, opt, env, self, options) => {
  const token = tokens[idx];
  const { source, image } = options;
  const imgPath = token.attrs[token.attrIndex("src")][1];

  let sourceEl = source.map(sourceItem => {
    let srcset = sourceItem.srcset.map(srcsetItem => {
      if (srcsetItem.src) {
        return `${srcsetItem.src} ${srcsetItem.w}w`;
      } else if (srcsetItem.query) {
        return `${imgPath}?${qs.stringify(srcsetItem.query)} ${srcsetItem.w}w`;
      }
      return `${imgPath} ${srcsetItem.w}w`;
    });
    srcset = srcset.join(", ");
    return `<source media="${sourceItem.media}" sizes="${
      sourceItem.sizes
    }" srcset="${imgPath}?style=placholder ${
      sourceItem.srcset[sourceItem.srcset.length - 1].w
    }w" data-srcset="${srcset}" />`;
  });
  sourceEl = sourceEl.join("");

  // normal
  if (token.attrIndex("alt") === -1) {
    token.attrPush(["alt", self.renderInlineAsText(token.children, opt, env)]);
  } else if (!token.attrs[token.attrIndex("alt")][1]) {
    token.attrs[token.attrIndex("alt")][1] = self.renderInlineAsText(
      token.children,
      opt,
      env
    );
  }

  // class
  token.attrPush(["class", "blog__img--content lazy"]);

  // sizes
  const sizesValue = image.sizes;
  token.attrPush(["sizes", sizesValue]);

  // srcset
  let srcsetValue = image.srcset.map(srcsetItem => {
    if (srcsetItem.src) {
      return `${srcsetItem.src} ${srcsetItem.w}w`;
    } else if (srcsetItem.query) {
      return `${imgPath}?${qs.stringify(srcsetItem.query)} ${srcsetItem.w}w`;
    }
    return `${imgPath} ${srcsetItem.w}w`;
  });
  srcsetValue = srcsetValue.join(", ");
  token.attrPush(["data-srcset", srcsetValue]);

  // responsive
  token.attrs[token.attrIndex("src")][1] = `${imgPath}?style=placholder`;

  return `
    <div class="blog__img">
      <picture>
        ${sourceEl}
        ${self.renderToken(tokens, idx, opt)}
      </picture>
    </div>
`;
};

function responsivePlugin(md, options) {
  if (!options) {
    throw new Error("markdown-it-responsive-image needs options");
  }
  md.renderer.rules.image = imageResponsive(md, options);
}

export default responsivePlugin;
