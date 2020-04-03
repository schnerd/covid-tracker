module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    _: 'readonly',
    moment: 'readonly',
    $: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
