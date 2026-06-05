import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import prettier from 'eslint-config-prettier';

export default [
  // Global ignores
  {
    ignores: ['dist', 'node_modules', 'build', '*.min.js', '.env*'],
  },

  // Main configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      promise,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ========== BASE ESLINT RULES ==========
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^(_|[A-Z])' }],
      'no-undef': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'no-return-await': 'warn',
      'no-throw-literal': 'error',

      // Code Quality
      'eqeqeq': 'warn',
      'curly': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'consistent-return': 'error',

      // ========== REACT RULES ==========
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'warn',
      'react/display-name': 'warn',

      // ========== REACT HOOKS RULES ==========
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ========== IMPORT RULES ==========
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unused-modules': 'warn',
      'import/no-cycle': 'error',

      // ========== PROMISE RULES ==========
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/catch-or-return': 'warn',
    },
  },

  // Prettier compatibility (disable formatting conflicts)
  prettier,
];