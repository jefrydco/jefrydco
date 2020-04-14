<template>
  <!-- Taken from: https://codesandbox.io/s/llk0j01rq -->
  <div class="star-rating">
    <button
      v-for="i in 5"
      :key="i"
      type="button"
      class="star-rating__star"
      :class="{ 'mr-1': i < 5 }"
      @click="$emit('input', i)"
    >
      <svg
        class="star-rating__svg"
        :class="{ 'star-rating__svg--active': value >= i }"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style>
.star-rating {
  @apply flex;

  &__star {
    &:focus {
      @apply outline-none;
    }
  }

  &__svg {
    @apply block h-8 w-8;
    color: var(--bg);

    &--active {
      color: var(--text-link);
    }
  }
}
</style>
