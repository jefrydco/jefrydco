module.exports = {
  plugins: ['vue', 'prettier'],
  extends: [
    'plugin:vue/strongly-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'prettier/prettier': 'warn',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off'
  },
  ignorePatterns: ['buildModules', 'libs']
}
