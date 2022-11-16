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

// # Import: Vite Modules
import { defineConfig, loadEnv } from 'vite';

// # Import: Package Version from `package.json` file
import packageInfo from './package.json';

// # webpack.BannerPlugin equivalent
import banner from 'vite-plugin-banner'

// # Import: Path package
import path from 'path';

export default defineConfig(({ command, mode, ssrBuild }) => {

  // # Define: Environment Variables based on mode
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // # Debugging: Output Current mode
  console.log('Vite Mode: ', mode);

  // # Default: Mode to development if not set
  mode = mode || 'development';

  // # Define: Package Version
  const VERSION = process.env.VERSION || packageInfo.version;


  return {
    root: 'src',

    // # Define: Path Resolutions/aliases
    resolve: {
      alias: {
      },
    },

    // # Set: Available variables for modules/packages
    define: {
      NODE_ENV: JSON.stringify(mode),
      VERSION: JSON.stringify(VERSION),
    },

    // # Build Options
    build: {

      // # Library Configurations
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: path.resolve(__dirname, './src/codex.ts'),
        name: 'EditorJS',
        // the proper extensions will be added
        fileName: 'vuetable-3',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        // external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          // globals: {
          //   vue: 'Vue',
          // },
          exports: 'named',
        },
      },

      // # Dynamic: Source Maps based on dev/production modes
      sourcemap: mode.toLowerCase().trim() != "production" ? true : false,
    },

    // # Extra Vite Plugins
    plugins: [
      banner(`Editor.js\n\n@version ${VERSION}\n\n@licence Apache-2.0\n@author CodeX <https://codex.so>\n\n@uses html-janitor\n@licence Apache-2.0 (https://github.com/guardian/html-janitor/blob/master/LICENSE)`),
    ],
  };
});
