<template>
  <div id="blog">
    <div class="header">
      <div class="header__img">
        <picture>
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 614px) 1100vw, 614px"
            :srcset="`${blog.img}?style=placeholder 614w`"
            :data-srcset="
              `
                ${blog.img}?style=cover-1x1-6 614w,
                ${blog.img}?style=cover-1x1-5 593w,
                ${blog.img}?style=cover-1x1-4 532w,
                ${blog.img}?style=cover-1x1-3 439w,
                ${blog.img}?style=cover-1x1-2 333w,
                ${blog.img}?style=cover-1x1-1 200w 
              `
            "
          />
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1169px) 100vw, 818px"
            :srcset="`${blog.img}?style=placeholder 818w`"
            :data-srcset="
              `
                ${blog.img}?style=cover-4x3-5 818w,
                ${blog.img}?style=cover-4x3-4 812w,
                ${blog.img}?style=cover-4x3-3 724w,
                ${blog.img}?style=cover-4x3-2 632w,
                ${blog.img}?style=cover-4x3-1 538w,

              `
            "
          />
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 1818px) 100vw, 1091px"
            :srcset="`${blog.img}?style=placeholder 1091w`"
            :data-srcset="
              `
                ${blog.img}?style=cover-16x9-7 1091w,
                ${blog.img}?style=cover-16x9-6 1089w,
                ${blog.img}?style=cover-16x9-5 1007w,
                ${blog.img}?style=cover-16x9-4  907w,
                ${blog.img}?style=cover-16x9-3  807w,
                ${blog.img}?style=cover-16x9-2  710w,
                ${blog.img}?style=cover-16x9-1  596w,
              `
            "
          />
          <img
            class="header__img--content lazy"
            sizes="(max-width: 4800px) 100vw, 1920px"
            width="1920"
            height="640"
            :alt="blog.title"
            :src="`${blog.img}?style=placeholder`"
            :srcset="`${blog.img}?style=placeholder 1920w`"
            :data-srcset="
              `
                ${blog.img}?style=cover-10 1920w,
                ${blog.img}?style=cover-9  1888w,
                ${blog.img}?style=cover-8  1808w,
                ${blog.img}?style=cover-7  1658w,
                ${blog.img}?style=cover-6  1509w,
                ${blog.img}?style=cover-5  1360w,
                ${blog.img}?style=cover-4  1196w,
                ${blog.img}?style=cover-3   991w,
                ${blog.img}?style=cover-2   766w,
                ${blog.img}?style=cover-1   480w,
              `
            "
          />
        </picture>
      </div>
      <div class="header__back">
        <nuxt-link class="header__back__link" :to="localePath('blog')">
          Blog
        </nuxt-link>
      </div>
    </div>
    <div class="max-w-lg ml-auto mr-auto">
      <div class="blog">
        <div class="blog__content">
          <main>
            <article>
              <header>
                <div class="blog__meta">
                  <h1 id="blog-title" class="blog__title">
                    {{ blog.title }}
                  </h1>
                  <div class="blog__date">
                    <span>
                      <time :datetime="blog.postedDate">
                        Posted on {{ $moment(blog.postedDate).format("ll") }}
                      </time>
                    </span>
                    •
                    <span>
                      <time :datetime="blog.updatedDate">
                        Updated on {{ $moment(blog.updatedDate).format("ll") }}
                      </time>
                    </span>
                    •
                    <span>
                      {{ Math.ceil(blog.readingTime.minutes.toFixed(2)) }}
                      {{ $t("minRead") }}
                    </span>
                  </div>
                </div>
              </header>
              <div class="blog__translations">
                {{ $t("readOtherLanguages") }}:
                <nuxt-link
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  :aria-label="locale.name"
                  :to="switchLocalePath(locale.code)"
                >
                  {{ locale.name }}
                </nuxt-link>
              </div>
              <!-- eslint-disable-next-line -->
              <div v-html="blog.content"></div>
              <footer>
                <p>
                  {{ $t("coverImageFrom") }}
                  <a
                    :href="`https://unsplash.com/@${blog.imgCreator}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{{ blog.imgCreator }}
                  </a>
                </p>
                <p>
                  <a
                    :href="blog.discussLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t("discussTwitter") }}
                  </a>
                  <span> • </span>
                  <a
                    :href="blog.editLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t("editGithub") }}
                  </a>
                </p>
              </footer>
            </article>
          </main>
        </div>
      </div>
    </div>
    <div class="max-w-lg my-12 ml-auto mr-auto">
      <app-profile />
    </div>
    <no-ssr>
      <vue-scroll-indicator
        height="2px"
        color="var(--textNormal)"
        background="var(--bg)"
      />
    </no-ssr>
    <app-to-top />
  </div>
</template>

<script>
import readingTime from "reading-time";
import AppProfile from "~/components/AppProfile";
import AppToTop from "~/components/AppToTop";

import lazyload from "~/mixins/lazyload";

export default {
  components: {
    AppProfile,
    AppToTop
  },
  mixins: [lazyload],
  head() {
    return {
      title: this.blog.title,
      link: [
        {
          rel: "amphtml",
          href: `${this.$route.path}/amp`
        }
      ],
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: this.blog.title
        },
        {
          hid: "og:url",
          name: "og:url",
          property: "og:url",
          content: `https://jefrydco.id/blog/${this.blog.slug}`
        },
        {
          hid: "og:image",
          name: "og:image",
          property: "og:image",
          content: `https://jefrydco.id${this.blog.img}`
        },
        {
          hid: "og:image:width",
          name: "og:image:width",
          property: "og:image:width",
          content: "1920"
        },
        {
          hid: "og:image:height",
          name: "og:image:height",
          property: "og:image:height",
          content: "1280"
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          property: "og:image:alt",
          content: this.blog.title
        },
        {
          hid: "description",
          name: "description",
          content: this.blog.description
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: this.blog.description
        }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "blogPosting",
            mainEntityOfPage: `https://jefrydco.id/blog/${this.blog.slug}`,
            headline: this.blog.title,
            description: this.blog.description,
            datePublished: this.blog.postedDate,
            dateCreated: this.blog.postedDate,
            dateModified: this.blog.updatedDate,
            wordcount: this.blog.readingTime.words,
            url: `https://jefrydco.id/blog/${this.blog.slug}`,
            articleBody: this.blog.content,
            image: {
              "@type": "imageObject",
              url: `https://jefrydco.id${this.blog.img}`,
              height: "1920",
              width: "614"
            },
            publisher: {
              "@type": "Organization",
              name: "Jefrydco",
              sameAs: "https://www.facebook.com/jefrydco.id",
              logo: {
                "@type": "imageObject",
                url: `https://jefrydco.id/icon.png`,
                width: "2739",
                height: "3102"
              }
            },
            author: {
              "@type": "Person",
              name: "Jefry Dewangga"
            }
          })
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://jefrydco.id/blog",
                  name: "Blog"
                }
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `https://jefrydco.id/blog/${this.blog.slug}`,
                  name: this.blog.title
                }
              }
            ]
          })
        }
      ]
    };
  },
  async asyncData({ params, store, app, redirect }) {
    const { locale } = store.state.i18n;
    const { locales, defaultLocale } = app.i18n;

    const availableLocales = locales.filter(i => i.code !== locale);

    let editPath = null;
    let blog = null;
    try {
      if (locale === defaultLocale) {
        editPath = `contents/blogs/${params.slug}/index.md`;
        blog = await require(`~/contents/blogs/${params.slug}/index.md`);
      } else {
        editPath = `contents/blogs/${params.slug}/index.${locale}.md`;
        blog = await require(`~/contents/blogs/${params.slug}/index.${locale}.md`);
      }
    } catch (error) {
      redirect("/blog");
      return;
    }

    const fullPath = `https://jefrydco.id/blog/${blog.attributes.slug}`;

    return {
      availableLocales,
      blog: {
        img: blog.attributes.img,
        imgCreator: blog.attributes.imgCreator,
        title: blog.attributes.title,
        description: blog.attributes.description,
        content: blog.html,
        postedDate: blog.attributes.postedDate,
        updatedDate: blog.attributes.updatedDate,
        slug: blog.attributes.slug,
        readingTime: readingTime(blog.html),
        fullPath,
        discussLink: `https://twitter.com/search?q=${encodeURIComponent(
          fullPath
        )}`,
        editLink: `https://github.com/jefrydco/jefrydco/edit/master/${editPath}`
      }
    };
  }
};
</script>

<style lang="postcss">
@import "~/assets/styles/mixins.pcss";

.header {
  @apply w-full relative;

  &__img {
    @mixin aspect-ratio picture, 16, 4.5;

    .lazy {
      @apply w-full h-auto;
    }
  }

  &__back {
    @apply absolute z-20;
    top: 1.7rem;
    left: 1.5rem;

    &__link {
      @apply cursor-pointer py-2 px-4 w-24 rounded shadow no-underline;
      background-color: var(--card-bg);
      color: var(--textNormal);

      &:focus {
        @apply outline-none;
      }

      &:hover {
        @apply shadow-lg;
      }

      svg {
        @apply block m-auto;
        stroke: var(--textNormal);
      }
    }
  }
}

.table-of-contents {
  ol {
    counter-reset: list-item;
  }
  li {
    @apply block;
    counter-increment: list-item;
  }
  li:before {
    content: counters(list-item, ".") " ";
  }
}

footer {
  p {
    @apply mb-3;
  }
}

.blog {
  @apply mb-12 mx-4 rounded overflow-hidden shadow relative;
  background-color: var(--card-bg);
  margin-top: -16rem;

  &__translations {
    @apply leading-normal mb-8 py-3 px-4 rounded-lg border;
    background-color: var(--inlineCode-bg);
    border-color: var(--inlineCode-border);
    color: var(--inlineCode-text);

    a:not(:last-child) {
      @apply mr-3;
    }
  }

  &__content {
    @apply px-16 py-10;
  }

  .lazy {
    @apply w-full h-auto mb-8;
  }

  &__meta {
    @apply mb-8;
  }

  &__title {
    @apply font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-base;
  }

  &__link {
    @apply absolute pin-t pin-l w-full h-full overflow-hidden z-0;
    text-indent: -9999px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .header {
    &__img {
      @mixin aspect-ratio picture, 16, 9;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .header {
    &__img {
      @mixin aspect-ratio picture, 4, 3;
    }
  }
}

@media (max-width: 767px) {
  .header {
    &__img {
      @mixin aspect-ratio picture, 1, 1;
    }
  }
}

@screen xs {
  .blog {
    &__content {
      @apply p-6;
    }
  }
}
</style>
