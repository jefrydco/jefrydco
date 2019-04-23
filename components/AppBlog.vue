<template>
  <div class="blog-item">
    <article>
      <div class="blog-item__img">
        <picture v-if="img">
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 614px) 100vw, 614px"
            :srcset="`${img}?style=placholder 614w`"
            :data-srcset="
              `
          ${img}?style=cover-1x1-1 200w,
          ${img}?style=cover-1x1-2 333w,
          ${img}?style=cover-1x1-3 439w,
          ${img}?style=cover-1x1-4 532w,
          ${img}?style=cover-1x1-5 593w,
          ${img}?style=cover-1x1-6 614w
          `
            "
          />
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1169px) 70vw, 818px"
            :srcset="`${img}?style=placholder 818w`"
            :data-srcset="
              `
          ${img}?style=cover-4x3-1 538w,
          ${img}?style=cover-4x3-2 632w,
          ${img}?style=cover-4x3-3 724w,
          ${img}?style=cover-4x3-4 812w,
          ${img}?style=cover-4x3-5 818w
          `
            "
          />
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 1818px) 60vw, 1091px"
            :srcset="`${img}?style=placholder 1091w`"
            :data-srcset="
              `
          ${img}?style=cover-16x9-1  596w,
          ${img}?style=cover-16x9-2  710w,
          ${img}?style=cover-16x9-3  807w,
          ${img}?style=cover-16x9-4  907w,
          ${img}?style=cover-16x9-5 1007w,
          ${img}?style=cover-16x9-6 1089w,
          ${img}?style=cover-16x9-7 1091w
          `
            "
          />
          <img
            class="blog-item__img--content lazy"
            :alt="title"
            sizes="(max-width: 4800px) 40vw, 1920px"
            :src="`${img}?style=placholder`"
            :srcset="`${img}?style=placholder 1920w`"
            :data-srcset="
              `
          ${img}?style=cover-1   480w,
          ${img}?style=cover-2   766w,
          ${img}?style=cover-3   991w,
          ${img}?style=cover-4  1196w,
          ${img}?style=cover-5  1360w,
          ${img}?style=cover-6  1509w,
          ${img}?style=cover-7  1658w,
          ${img}?style=cover-8  1808w,
          ${img}?style=cover-9  1888w,
          ${img}?style=cover-10 1920w
          `
            "
          />
        </picture>
      </div>
      <div class="blog-item__meta">
        <header>
          <h2 class="blog-item__title">
            {{ title }}
          </h2>
          <div class="blog-item__date">
            <span>
              <time :datetime="postedDate">
                Posted on {{ $moment(postedDate).format("ll") }}
              </time>
            </span>
            •
            <span>
              <time :datetime="updatedDate">
                Updated on {{ $moment(updatedDate).format("ll") }}
              </time>
            </span>
            •
            <span>
              {{ Math.ceil(readingTime.minutes.toFixed(2)) }}
              {{ $t("minRead") }}
            </span>
          </div>
        </header>
        <p class="blog-item__description">
          {{ description }}
        </p>
        <nuxt-link
          class="blog-item__link"
          :aria-label="title"
          :to="localePath({ name: 'blog-slug', params: { slug } })"
        >
          {{ title }}
        </nuxt-link>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    postedDate: {
      type: String,
      default: ""
    },
    updatedDate: {
      type: String,
      default: ""
    },
    readingTime: {
      type: Object,
      default() {
        return null;
      }
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="postcss">
/* TODO: Find a way to make it global on first building attemp */
@define-mixin aspect-ratio $selector, $width: 16, $height: 9 {
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: calc(($height / $width) * 100%);
  }
  > $(selector) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.blog-item {
  @apply mb-12 mx-4 max-w-lg rounded overflow-hidden shadow relative;
  background-color: var(--card-bg);

  &:hover {
    @apply shadow-lg;
  }

  &__img {
    @mixin aspect-ratio picture, 16, 4.5;

    .lazy {
      @apply w-full h-auto;
    }
  }

  &__meta {
    @apply px-16 py-10;
  }

  &__title {
    @apply capitalize font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-base;
  }

  &__description {
    @apply leading-normal mb-0 !important;
  }

  &__link {
    @apply absolute pin-t pin-l w-full h-full overflow-hidden z-0;
    text-indent: -9999px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .blog-item {
    &__img {
      @mixin aspect-ratio picture, 16, 9;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .blog-item {
    &__img {
      @mixin aspect-ratio picture, 4, 3;
    }
  }
}

@media (max-width: 767px) {
  .blog-item {
    &__img {
      @mixin aspect-ratio picture, 1, 1;
    }
  }
}

@screen xs {
  .blog-item {
    &__meta {
      @apply p-6;
    }
  }
}
</style>
