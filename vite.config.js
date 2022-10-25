/**
 * Vite Configuration
 *
 * Replacement for @codex-team/editor.js webpack
 * implementation to prevent CSP issues when using
 * webpack/babel as the bundler.
 *
 * @author immersedone
 * @copyright Truc Minh Phan
 */

// # Import: Modules
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
    },
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        editor: './src/codex.ts',
      },
    },
  },
  plugins: [],
});
