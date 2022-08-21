module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
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
        extensions: ['.js', '.jsx'],
        map: [
          ['@', './src'],
          ['@fixtures', './fixtures'],
        ],
      },
    },
  },
  plugins: [
    'react',
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
        ],
      },
    ],

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
