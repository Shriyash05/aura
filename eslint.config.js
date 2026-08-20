// https://docs.expo.dev/guides/using-eslint/
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['dist/*', '.expo/*', 'node_modules/*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
];
