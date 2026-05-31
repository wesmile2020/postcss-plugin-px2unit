import type { PluginCreator } from 'postcss';

import type { Options } from './options';
import { defaultOptions } from './options';
import { convertPxToUnit, createExcludePatterns, isExcluded } from './utils';

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

      rule.walkDecls((decl) => {
        if (!decl.value || !decl.value.includes('px')) return;
        decl.value = convertPxToUnit(decl.value, opts);
      });
    },
  };
};

px2unit.postcss = true;
export default px2unit;
