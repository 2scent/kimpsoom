module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [
          ['@', './src'],
          ['@fixtures', './fixtures'],
        ],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.js',
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.config.ts',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
