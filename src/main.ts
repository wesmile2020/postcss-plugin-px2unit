import type { PluginCreator } from 'postcss';

export interface Options {
  unit?: 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax';
  ratio?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  minPixelValue?: number;
  exclude?: RegExp | string[];
}

const px2unit: PluginCreator<Options> = (options = {}) => {
  const opts: Required<Options> = {
    unit: 'rem',
    ratio: 16,
    viewportWidth: 375,
    viewportHeight: 667,
    minPixelValue: 1,
    exclude: [],
    ...options,
  };

  const excludePatterns = Array.isArray(opts.exclude)
    ? opts.exclude.map((p) => new RegExp(p))
    : [opts.exclude];

  const convertValue = (value: string): string => {
    return value.replace(/(\d*\.?\d+)px/g, (match, numStr) => {
      const num = parseFloat(numStr);
      if (num < opts.minPixelValue) return match;

      let result: number;
      switch (opts.unit) {
        case 'vw':
          result = (num / opts.viewportWidth) * 100;
          break;
        case 'vh':
          result = (num / opts.viewportHeight) * 100;
          break;
        case 'vmin':
          result = (num / Math.min(opts.viewportWidth, opts.viewportHeight)) * 100;
          break;
        case 'vmax':
          result = (num / Math.max(opts.viewportWidth, opts.viewportHeight)) * 100;
          break;
        case 'rem':
        default:
          result = num / opts.ratio;
          break;
      }

      return result.toFixed(4).replace(/\.?0+$/, '') + opts.unit;
    });
  };

  const isExcluded = (selector: string): boolean => {
    return excludePatterns.some((pattern) => pattern.test(selector));
  };

  return {
    postcssPlugin: 'postcss-plugin-px2unit',

    Rule(rule) {
      if (!rule.selector || isExcluded(rule.selector)) return;

      rule.walkDecls((decl) => {
        if (!decl.value || !decl.value.includes('px')) return;
        decl.value = convertValue(decl.value);
      });
    },
  };
};

px2unit.postcss = true;
export default px2unit;
