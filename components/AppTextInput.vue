<template>
  <div class="form">
    <label :for="id" class="form__label">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="value"
      type="text"
      class="app-demo__form form__input"
      :class="computedClass"
      v-on="{
        ...$listeners,
        input: onInput
      }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      default: '',
      validator: (val) =>
        typeof val === 'string' || typeof val === 'number' || val === null
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClass() {
      return {
        'form__input--full-width': this.fullWidth
      }
    }
  },
  methods: {
    onInput(event: Event) {
      this.$emit('input', (event.target as HTMLInputElement).value)
    }
  }
})
</script>

<style lang="postcss">
.form {
  &__input {
    @apply block;

    &--full-width {
      @apply w-full;
    }
  }
}
</style>
