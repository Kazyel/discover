import github from 'eslint-plugin-github';

const config = [
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript,
  {
    files: ['**/*.{ts,tsx,mtsx}'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'github/array-foreach': 'error',
      'github/async-preventdefault': 'warn',
      'github/no-then': 'error',
      'github/no-blur': 'error',
      'i18n-text/no-en': 'off',
      'no-console': 'off',
    },
  },
];

export default config;
