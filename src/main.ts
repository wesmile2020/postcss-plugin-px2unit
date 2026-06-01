import type { PluginCreator } from 'postcss';

import type { Options } from './options';
import { defaultOptions } from './options';
import { convertPxToUnit, createExcludePatterns, getRootValue, isExcluded } from './utils';

const px2unit: PluginCreator<Options> = function (options = {}) {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  const excludePatterns = createExcludePatterns(opts.exclude);

  return {
    postcssPlugin: 'postcss-plugin-px2unit',

    Rule(rule) {
      if (!rule.selector || isExcluded(rule.selector, excludePatterns)) return;
      
      const filePath = rule.source?.input.file;
      const rootValue = getRootValue(opts.rootValue, filePath);

      rule.walkDecls((decl) => {
        if (!decl.value || !/px/.test(decl.value)) return;
        decl.value = convertPxToUnit(decl.value, rootValue, opts.unit, opts.minPixelValue);
      });
    },
  };
};

px2unit.postcss = true;
export default px2unit;
