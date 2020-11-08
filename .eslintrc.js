module.exports = {
  plugins: ['vue', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'prettier/prettier': 'error',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-for-template-key-on-child': 'off'
  }
}
