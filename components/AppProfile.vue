<template>
  <div class="profile">
    <aside>
      <div class="profile__img">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA/CAMAAACCXfuUAAAAh1BMVEVHcEwhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvMhlvNiF0boAAAALHRSTlMAIJBeMxP1zJlmmAY1O7f51ifBCSxHlfNNh6Pn7H5x/Ric46/hUtl1QKhr0UvQqeIAAAHbSURBVHjavZZnb4MwEECPYcweGZA9mjSr/v+/r0qLucg9i3NV9X0882TsGwB/SnaYhYgAC1KNsJfH4OAoIpMgM8VI8VgnhqjYyObVOyg+0QKQULmQANIqgqqW39TGwjsQ6MUcXmmC0x7FaDYuIsJHs87sYgg/yM+DeeWIiDeYnWCJaHa4JUdEgqGECJFADgmY6NCcECmCfnmhAz5T3OgErPvAhSmq3KwxwRQL811vTFF3k8BSZ4k1aNaW29nTTVj8mDKxIXaE1p1e2uHYB0tD1OU4AwuxLgojfunjnk30LaLENNHsRsSpTXyMiGBjiZfjJsaYDlJMXgkJMSVFkxKPXPahB0tUK9B84HDliOpgFvOMJWJb5XrMA0vERr7qbyVXFMbdbJniyuzjnCdOdDq2feANbGKMpP7wLRWbfnlpFYGkVdh1Lm01xyMTon0CFJFOYmMXQ2K/SOEJ+aJIcVZSXb6nxXka4axsqGPo1YuU969ctG18lJVCqhs5w5x+kBAvGvM2BeVNJ2Ne6ZHefUQ7B0AhRvaTQUZ687Oy05VbD0hEjE/5RZA82S3bNE2XSXJDySDbbdCLgY+vDM9drHYuHia+Dh0s/EmLtlNw5fTsaw/cEetVA79iCv/HJ2tF+J+Kc7zlAAAAAElFTkSuQmCC"
          width="56"
          height="63"
          alt="jefrydco"
        />
        <nuxt-link class="profile__link" to="/" aria-label="Jefrydco">
          Jefrydco
        </nuxt-link>
      </div>
      <div class="profile__meta">
        <div v-if="$route.name.includes('blog-slug')" class="profile__name">
          Jefrydco
        </div>
        <h1 v-else="" class="profile__name">Jefrydco</h1>
        <h2 class="profile__description">
          {{ $t('description') }}
        </h2>
      </div>
      <div class="profile__navigation">
        <a
          href="https://about.me/jefrydco"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
        <nuxt-link :to="localePath('blog')">Blog</nuxt-link>
        <a
          v-for="social in socials"
          :key="social.code"
          :href="social.url"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ social.name }}
        </a>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        { code: 'github', name: 'Github', url: 'https://github.com/jefrydco' },
        {
          code: 'twitter',
          name: 'Twitter',
          url: 'https://twitter.com/jefrydco'
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
/* purgecss start ignore */
.profile {
  &__img {
    @apply rounded-full ml-auto mr-auto h-24 w-24 p-5 flex items-center justify-center relative;
  }

  &__link {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden z-0;
    text-indent: -9999px;
  }

  &__meta {
    @apply text-center;
  }

  &__name {
    @apply leading-normal mt-0 mb-5 font-bold text-2xl;
    font-family: 'Bitter', serif;
  }

  &__description {
    @apply leading-normal mt-0;
  }

  &__navigation {
    @apply text-center mt-3;

    a:not(:last-child) {
      @apply mr-3;
    }
  }
}
/* purgecss end ignore */
</style>
