import type { RequiredOptions } from '../options';

export function convertPxToUnit(value: string, opts: RequiredOptions): string {
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
}

export function createExcludePatterns(exclude: RegExp | string[]): RegExp[] {
  return Array.isArray(exclude) ? exclude.map((p) => new RegExp(p)) : [exclude];
}

export function isExcluded(selector: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(selector));
}
