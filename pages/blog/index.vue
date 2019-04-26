<template>
  <div id="blog-index">
    <div class="max-w-lg my-12 ml-auto mr-auto">
      <app-profile />
    </div>
    <div class="max-w-lg ml-auto mr-auto">
      <main>
        <app-blog
          v-for="(blog, i) in blogs"
          :key="`blog_${i}`"
          :img="blog.img"
          :title="blog.title"
          :description="blog.description"
          :posted-date="blog.postedDate"
          :updated-date="blog.updatedDate"
          :reading-time="blog.readingTime"
          :slug="blog.slug"
        />
      </main>
    </div>
    <div class="max-w-lg my-12 ml-auto mr-auto text-center">
      <a :href="rssLink" target="_blank" rel="noopener noreferrer">RSS</a>
    </div>
  </div>
</template>

<script>
import AppProfile from "~/components/AppProfile";
import AppBlog from "~/components/AppBlog";

import lazyload from "~/mixins/lazyload";

import readingTime from "reading-time";

import blogPaths from "~/contents/blogs";

export default {
  components: {
    AppProfile,
    AppBlog
  },
  mixins: [lazyload],
  data() {
    return {
      blogs: []
    };
  },
  computed: {
    rssLink() {
      const { locale } = this.$i18n;
      if (locale === "id") {
        return `https://jefrydco.id/blog.xml`;
      }
      return `https://jefrydco.id/${locale}/blog.xml`;
    }
  },
  async asyncData({ store, app }) {
    const { locale } = store.state.i18n;
    const { defaultLocale } = app.i18n;

    // Taken from: https://marinaaisa.com/blog/blog-using-vue-nuxt-markdown
    const asyncImport = async blogPath => {
      let blogs = null;
      if (locale === defaultLocale) {
        blogs = await require(`~/contents/blogs/${blogPath}/index.md`);
      } else {
        blogs = await require(`~/contents/blogs/${blogPath}/index.${locale}.md`);
      }
      return {
        ...blogs.attributes,
        readingTime: readingTime(blogs.html)
      };
    };

    const blogs = await Promise.all(
      blogPaths.map(blogPath => asyncImport(blogPath))
    );

    return {
      blogs
    };
  },
  head() {
    const { locales } = this.$i18n;
    const link = locales.map(locale => {
      let href = null;
      if (locale.code === "id") {
        href = `https://jefrydco.id/blog.xml`;
      } else {
        href = `https://jefrydco.id/${locale.code}/blog.xml`;
      }
      return {
        rel: "alternate",
        type: "application/rss+xml",
        href,
        title: `Blog - Jefrydco`
      };
    });
    return {
      title: "Blog",
      link,
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Blog",
            name: "Jefrydco",
            headline: "A personal site of Jefry Dewangga",
            description: "A personal site of Jefry Dewangga",
            about: "A personal site of Jefry Dewangga",
            keywords: "jefrydco, Jefry Dewangga",
            genre: ["Personal", "Tutorial", "Programming", "Review", "Science"],
            copyrightYear: new Date().getFullYear(),
            dateCreated: "2017-03-12",
            inLanguage: ["English", "Bahasa Indonesia"],
            isAccessibleForFree: "true",
            isFamilyFriendly: "true",
            license: "https://opensource.org/licenses/MIT",
            image: {
              "@type": "imageObject",
              url: `https://jefrydco.id/icon.png`,
              width: "2739",
              height: "3102"
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
            blogPosts: this.blogs.map(blog => ({
              "@type": "blogPosting",
              mainEntityOfPage: `https://jefrydco.id/blog/${blog.slug}`,
              headline: blog.title,
              description: blog.description,
              datePublished: blog.postedDate,
              dateCreated: blog.postedDate,
              dateModified: blog.updatedDate,
              wordcount: blog.readingTime.words,
              url: `https://jefrydco.id/blog/${blog.slug}`,
              image: {
                "@type": "imageObject",
                url: `https://jefrydco.id${blog.img}`,
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
            }))
          })
        },
        {
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
            }
          ]
        }
      ]
    };
  }
};
</script>
