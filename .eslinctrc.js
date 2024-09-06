//.eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // Add this line to define the browser environment
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  globals: {
    process: 'readonly', // Define process as a global variable
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
