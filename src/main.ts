import type { PluginCreator } from 'postcss';

import type { Options } from './options';
import { defaultOptions } from './options';
import {
  convertPxToUnit,
  createExcludePatterns,
  getRootValue,
  isInMediaQuery,
  isExcluded,
  isPropInWhiteList,
  isPropInBlackList,
  isSelectorInBlackList,
} from './utils';

const px2unit: PluginCreator<Options> = function (options = {}) {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  const excludePatterns = createExcludePatterns(opts.exclude);

  return {
    postcssPlugin: 'postcss-plugin-px2unit',

    Rule(rule) {
      const filePath = rule.source?.input.file;
      if (isExcluded(filePath, excludePatterns)) {
        return;
      }

      if (!options.mediaQuery && isInMediaQuery(rule)) {
        return;
      }

      if (isSelectorInBlackList(rule.selector, opts.selectorBlackList)) {
        return;
      }

      const rootValue = getRootValue(opts.rootValue, filePath);

      rule.walkDecls((decl) => {
        if (!decl.value || !/px/.test(decl.value)) {
          return;
        }
        if (!isPropInWhiteList(decl.prop, opts.propWhiteList)) {
          return;
        }
        if (isPropInBlackList(decl.prop, opts.propBlackList)) {
          return;
        }
        decl.value = convertPxToUnit(decl.value, {
          rootValue,
          unit: opts.unit,
          minPixelValue: opts.minPixelValue,
          precision: opts.precision,
        });
      });
    },
  };
};

px2unit.postcss = true;
export default px2unit;
