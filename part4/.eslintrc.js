module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [2, 'never'],
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'semi-style': ['error', 'first'],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': 'warn',
  },
}
