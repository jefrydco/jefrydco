<i18n>
{
  "id": {
    "peekaboo": "Ciluk ba!"
  },
  "en": {
    "peekaboo": "Peek a boo!"
  }
}
</i18n>

<template>
  <div class="flex justify-center mb-10">
    <button
      class="
        bg-yellow-400
        hover:bg-orange-600
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
    >
      {{ $t('peekaboo') }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppButton'
})
</script>
