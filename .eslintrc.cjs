/** @type {import("eslint").Linter.Config} */
const config = {
  parserOptions: {
    project: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    curly: ['error', 'all'],
    'no-restricted-exports': ['error', { restrictDefaultExports: { direct: true } }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'SwitchCase > *.consequent[type!="BlockStatement"]',
        message: 'Switch cases without blocks are disallowed.',
      },
    ],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
};

module.exports = config;
