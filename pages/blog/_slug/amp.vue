<script>
import Page from "./index";

export default {
  extends: Page,
  head() {
    return {
      title: this.blog.title,
      link: [
        {
          rel: "canonical",
          href: `${this.$route.path}`.replace(/\/amp((\/.*$)|$)/gi, "")
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
  }
};
</script>

<style lang="postcss">
@import "~/assets/styles/mixins.pcss";

html[⚡] {
  .header {
    &__img {
      @mixin aspect-ratio picture, 16, 4.5;

      &:before {
        @apply hidden;
      }
    }
  }
  .blog {
    margin-top: -10rem;
  }
  .switch {
    @apply hidden;
  }
}
@media (max-width: 767px) {
  html[⚡] {
    .blog {
      margin-top: -3rem;
    }
  }
}
</style>
