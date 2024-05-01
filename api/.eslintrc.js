module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    'ecmaVersion': 2018,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'object-curly-spacing': ['error', 'never'],
    'indent': ['error', 2],
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
  },
  overrides: [{
    files: ['**/*.spec.*'],
    env: {
      mocha: true,
    },
    rules: {},
  }],
  globals: {},
};
