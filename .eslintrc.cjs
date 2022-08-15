module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es2017: true,
    browser: true,
    node: true,
  },
  ignorePatterns: ['**/dist', '*.html', 'schema.json'],
  plugins: ['svelte3', 'security'],
  overrides: [
    {
      files: ['**.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['schema.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/description-style': 'error',
        // '@graphql-eslint/input-name': 'error',
        '@graphql-eslint/lone-schema-definition': 'error',
        '@graphql-eslint/naming-convention': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
        '@graphql-eslint/no-hashtag-description': 'error',
        '@graphql-eslint/no-unreachable-types': 'error',
        '@graphql-eslint/provided-required-arguments': 'error',
        '@graphql-eslint/unique-field-definition-names': 'error',
        '@graphql-eslint/unique-operation-types': 'error',
        '@graphql-eslint/unique-type-names': 'error',
        '@graphql-eslint/strict-id-in-types': [
          'error',
          {
            acceptedIdNames: ['id', '_id'],
            acceptedIdTypes: ['ID'],
            exceptions: { types: ['Error'], suffixes: ['Payload'] },
          },
        ],
      },
      parserOptions: {
        operations: './src/lib/graphql/*.gql',
        schema: './src/lib/graphql/schema.graphql',
      },
    },
    {
      files: ['*.gql'],
      extends: 'plugin:@graphql-eslint/operations-recommended',
      parserOptions: {
        operations: './src/lib/graphql/*.gql',
        schema: './src/lib/graphql/schema.graphql',
      },
    },
  ],
  rules: {
    // 'unicorn/filename-case': 0,
    'import/first': 0,
    //  'unicorn/no-nested-ternary': 'off',
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
  },
}
