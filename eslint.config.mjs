// eslint.config.mjs
import js from '@eslint/js';
import ts from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    ignores: ['dist/', 'node_modules/', 'packages/**/templates/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: ts.parser },
    plugins: {
      '@typescript-eslint': ts.plugin,
      next: nextPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      'next/no-html-link-for-pages': 'off',
    },
  },
];
