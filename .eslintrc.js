// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */

// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:perfectionist/recommended-natural',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json',
      },
      //      "alias": {
      //        "map": [["#", "./src"]],
      //        "extensions": [".ts", ".tsx", ".js", ".jsx"]
      //      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@stylistic/migrate',
    '@stylistic',
    'unicorn',
    'sonarjs',
    'formatjs',
    'perfectionist',
    'import',
  ],
  ignorePatterns: ['.eslintrc.js', '.postInstall.js'],
  rules: {
    semi: ['error', 'always'],
    'block-scoped-var': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-multi-spaces': 'error',
    'no-return-await': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'wrap-iife': 'error',
    yoda: 'error',
    'no-confusing-arrow': 'warn', // TODO replace with below
    // 'no-confusing-arrow': [
    //   'error',
    //   {
    //     allowParens: true,
    //   },
    // ],
    'no-shadow': 1,
    'no-undef-init': 'error',
    'no-label-var': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': ['error', 'last'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],

    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'no-new-object': 'error',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'operator-assignment': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'spaced-comment': ['error', 'always'],
    'import/order': 'off',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'unicorn/no-invalid-fetch-options': 'off',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': [
      'warn',
      {
        object: true,
        array: true,
      },
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-key': 'warn',
    'formatjs/no-offset': 'error',
    'formatjs/enforce-default-message': ['error', 'literal'],
    'formatjs/no-literal-string-in-jsx': [
      2,
      {
        props: {
          include: [
            ['*', 'message'],
            ['*', 'description'],
            ['*', 'title'],
            ['*', 'label'],
            ['*', 'okText'],
            ['*', 'cancelText'],
            ['*', 'header'],
            ['*', 'placeholder'],
            ['Form.Item', 'tooltip'],
          ],
        },
      },
    ],
    // 'formatjs/enforce-id': [
    //   'error',
    //   {
    //     idInterpolationPattern: '[sha512:contenthash:base64:6]',
    //     idWhitelist: ['^const_.*'],
    //   },
    // ],
    'formatjs/no-id': 'error',
    'formatjs/enforce-placeholders': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'sonarjs/no-duplicate-string': 'warn',
    '@typescript-eslint/no-unsafe-enum-comparison': 'warn', // TODO turn back on
    'no-void': ['error', { allowAsStatement: true }],
    'import/no-named-as-default': 0,
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    '@typescript-eslint/space-before-blocks': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'react/destructuring-assignment': 'error',
    'unicorn/prefer-query-selector': 'off',
    'no-restricted-exports': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'react/display-name': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
  },
};
