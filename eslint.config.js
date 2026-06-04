import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Variables
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^(_|[A-Z])' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Code quality
      eqeqeq: ['error', 'smart'],
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',

      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
