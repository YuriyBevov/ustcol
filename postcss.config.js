import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import purgecss from'@fullhuman/postcss-purgecss';
import postcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssCalc from 'postcss-calc';

export default {
  plugins: [
    postcssCalc({}),
    autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
    }),
    postcssSortMediaQueries({
      sort: 'mobile-first', // mobile-first || desktop-first
    }),
    purgecss({
      content: ['./**/*.html', './**/*.pug'],
      safelist: {
        deep: [/^swiper/, /^zoom/, /^ymaps-icon-content-layout-inner/],
      }
    }),
    // always after postcssSortMediaQueries
    postcssCombineDuplicatedSelectors({
      removeDuplicatedValues: true
    })
  ]
}
