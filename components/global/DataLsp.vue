<template>
  <div
    v-tooltip.top="{ content: lsp, autoHide: false, html: true }"
    class="shiki__data-lsp"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { VTooltip } from 'v-tooltip'

export default {
  directives: {
    tooltip: VTooltip
  },
  props: {
    lsp: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
/* purgecss start ignore */
.shiki {
  &__data-lsp {
    @apply inline;
  }

  &:hover {
    .shiki {
      &__data-lsp {
        border-bottom: 0.1rem dotted #e2e8f0;
      }
    }
  }
}

.tooltip {
  @apply block z-50;

  .tooltip-inner {
    @apply rounded max-w-3xl bg-black text-white;
    padding: 5px 10px 4px;

    pre,
    code {
      @apply whitespace-pre-wrap;
    }
  }

  .tooltip-arrow {
    @apply w-0 h-0 border-solid absolute border-black z-10;
    margin: 5px;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    @apply opacity-0;
    visibility: hidden;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    @apply visible opacity-100;
    transition: opacity 0.15s;
  }
}
/* purgecss end ignore */
</style>
