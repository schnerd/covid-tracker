module.exports = {
  env: {
    browser: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    Promise: 'readonly',
    SharedArrayBuffer: 'readonly',
    d3: 'readonly',
    _: 'readonly',
    moment: 'readonly',
    $: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2016,
  },
  rules: {},
};
