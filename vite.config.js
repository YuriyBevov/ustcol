import Inspect from 'vite-plugin-inspect';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import pages from 'vituum/plugins/pages.js';
import imports from 'vituum/plugins/imports.js';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Inspect(),
    vituum(),
    pug(),
    imports({
      paths: [
        '/src/assets/*/**'
      ]
    }),
    pages({
      dir: './',
      root: './',
      normalizeBasePath: true
    }),
    VitePluginSvgSpritemap('./src/assets/sprite/*.svg', {
      styles: false,
      injectSVGOnDev: true,
      svgo: {
        plugins: [
          {
            name: 'removeStyleElement',
          },
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|height|width)',
            },
          }
        ],
      },
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false,
                },
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
        palette: true
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
      cache: true,
      cacheLocation: './.cache',
    })
  ],

  css: {
    outDir: '../dist/assets',
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },

  publicDir: 'public',
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: ['index.pug', 'inner.pug']
  }
  },

  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src/assets'),
    }
  }
});

