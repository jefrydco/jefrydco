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
      class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
    >
      {{ $t('peekaboo') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppButton'
}
</script>
