<template>
  <div class="switch">
    <button
      aria-label="Toggle dark or light theme"
      class="switch__btn"
      @click="$emit('input', !value)"
    >
      <svg
        v-if="value"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="switch__sun"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        v-else=""
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="switch__moon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(value) {
      Cookie.set('d', Number(this.value), {
        expires: 365
      })
    }
  }
}
</script>

<style lang="postcss">
/* purgecss start ignore */
.switch {
  @apply absolute z-20;
  top: 1rem;
  right: 1.5rem;

  &__btn {
    @apply w-12 h-12 rounded-full shadow;
    background-color: var(--card-bg);

    &:focus {
      @apply outline-none;
    }

    &:hover {
      @apply shadow-lg;
    }

    svg {
      @apply block m-auto;
      stroke: var(--text-normal);
    }
  }
}

html[⚡] {
  .switch {
    @apply hidden;
  }
}
/* purgecss end ignore */
</style>
