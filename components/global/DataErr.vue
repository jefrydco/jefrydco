<template>
  <span class="shiki__d-err"><slot /></span>
</template>

<style>
/* purgecss start ignore */
.shiki {
  &__d-err {
    @apply inline;

    .shiki {
      &__d-lsp {
        border-bottom: 0.1rem solid var(--error);
      }
    }
  }

  &:hover {
    .shiki {
      &__d-err {
        .shiki {
          &__d-lsp {
            border-bottom: 0.1rem solid var(--error);
          }
        }
      }
    }
  }
}
/* purgecss end ignore */
</style>
