module.exports = {
  parser: 'babel-eslint',
  plugins: [
    // prttier-ignore
    'import',
    'simple-import-sort',
    'prettier',
  ],
  extends: [
    // prettier-ignore
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb-base',
  ],
  env: { es6: true, node: true },

  parserOptions: {
    // ecmaVersion: 2018,
    // sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    "curly": ["error", "all"], // prettier-ignore
    'import/order': 'off',
    'simple-import-sort/sort': 'error',
  },
};
