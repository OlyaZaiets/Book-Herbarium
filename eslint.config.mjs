import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 🔹 Prettier: вимикає конфліктні ESLint-правила
  prettierConfig,

  // 🔹 Prettier як ESLint-правило
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // 🔹 Ігнори
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
