<template>
  <div id="to-top" class="to-top">
    <a class="to-top__link" aria-label="To Top" href="#__nuxt">▲</a>
  </div>
</template>

<style lang="postcss">
/* purgecss start ignore */
.to-top {
  @apply fixed z-20;
  bottom: 1rem;
  right: 1.5rem;

  &__link {
    @apply block w-12 h-12 rounded-full shadow no-underline text-center text-2xl hover:shadow-lg;
    line-height: 1.8;
    background-color: var(--card-bg);
    color: var(--text-normal);
  }
}

@media (max-width: 992px) {
  .to-top {
    &__link {
      background-color: var(--bg);
    }
  }
}
/* purgecss end ignore */
</style>
