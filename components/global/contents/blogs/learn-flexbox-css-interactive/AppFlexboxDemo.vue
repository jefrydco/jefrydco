<template>
  <div
    class="demo__card demo__card--custom"
    :class="{ 'demo__card--custom--floating': isFloating }"
  >
    <div class="flex-container" :style="flexContainer">
      <button
        v-for="flexItemItem in flexItemList"
        :key="flexItemItem.index"
        class="item box"
        :class="`item-${flexItemItem.index} ${
          isDifferentHeight ? 'box--different-height' : ''
        }`"
        :style="{
          ...flexItemItem.style,
          flexBasis: flexItemItem.isFlexBasisAuto
            ? flexItemItem.style.flexBasis
            : `${flexItemItem.flexBasis}%`
        }"
        @click="onBoxClicked(flexItemItem.index)"
      >
        {{ flexItemItem.index }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    flexContainer: {
      type: Object,
      default() {
        return {}
      }
    },
    flexItemList: {
      type: Array,
      default() {
        return []
      }
    },
    isDifferentHeight: {
      type: Boolean,
      default: false
    },
    onBoxClicked: {
      type: Function,
      default() {
        return () => {}
      }
    },
    isFloating: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
/* purgecss start ignore */
.prose {
  .demo__card--custom {
    height: 24rem;

    &--floating {
      @apply fixed z-10 shadow-lg rounded-lg;
      background-color: var(--card-bg);
      bottom: 5rem;
      right: 1.5rem;
      width: 46rem;
      transform: scale(calc((100 / 3) / 100));
      transform-origin: 100% 100%;
    }
  }
  .flex-container {
    .box {
      @apply w-16 h-16 rounded m-1 p-4 text-center text-xl cursor-pointer z-20 bg-orange-500;
      color: var(--text-normal);

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        @apply bg-orange-700;
      }

      &--different-height {
        &:nth-child(odd) {
          @apply h-16 py-4;
        }

        &:nth-child(even) {
          @apply h-24 py-8;
        }
      }
    }
  }
  @media (max-width: 992px) {
    .demo__card--custom {
      &--floating {
        top: 5rem;
        transform-origin: 100% 0;
        background-color: var(--bg);
      }
    }
  }
}
/* purgecss end ignore */
</style>
