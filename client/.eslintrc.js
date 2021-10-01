module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-named-default': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    'jsx-a11y/accessible-emoji': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
  },
};
