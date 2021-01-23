<template>
  <div class="shiki__data-err"><slot /></div>
</template>

<style>
/* purgecss start ignore */
.shiki {
  &__data-err {
    @apply inline;

    .shiki {
      &__data-lsp {
        border-bottom: 0.1rem solid var(--error);
      }
    }
  }

  &:hover {
    .shiki {
      &__data-err {
        .shiki {
          &__data-lsp {
            border-bottom: 0.1rem solid var(--error);
          }
        }
      }
    }
  }
}
/* purgecss end ignore */
</style>
