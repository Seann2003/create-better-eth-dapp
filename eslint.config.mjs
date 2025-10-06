export default [
  {
    ignores: ['node_modules', 'dist', 'packages/**/templates/**'],
  },
  {
    files: ['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
