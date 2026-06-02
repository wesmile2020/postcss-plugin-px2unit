import type { Document, Rule } from 'postcss';

import type { Options } from '../options';

export function getRootValue(rootValue: Options['rootValue'], filePath?: string): number {
  if (typeof rootValue === 'function') {
    return rootValue(filePath);
  }
  return rootValue ?? 16;
}

export interface ConvertConfig {
  rootValue: number;
  unit: Options['unit'];
  minPixelValue: number;
  precision: number;
}

export function convertPxToUnit(value: string, config: ConvertConfig): string {
  const { rootValue, unit, minPixelValue, precision } = config;
  return value.replace(/(\d*\.?\d+)px/g, (match, numStr) => {
    const num = parseFloat(numStr);
    if (num < minPixelValue) {
      return match;
    }

    let result: number;
    switch (unit) {
      case 'vw':
      case 'vh':
      case 'vmin':
      case 'vmax':
        result = (num / rootValue) * 100;
        break;
      case 'rem':
      default:
        result = num / rootValue;
        break;
    }

    return result.toFixed(precision).replace(/\.?0+$/, '') + unit;
  });
}

export function createExcludePatterns(exclude: RegExp | string[]): RegExp[] {
  if (Array.isArray(exclude)) {
    return exclude.map((p) => new RegExp(p));
  }
  return [exclude];
}

export function isExcluded(filePath: string | undefined, patterns: RegExp[]): boolean {
  if (!filePath) {
    return true;
  }
  return patterns.some((pattern) => pattern.test(filePath));
}

export function isPropInWhiteList(prop: string, patterns: RegExp[]): boolean {
  if (patterns.length === 0) {
    return true;
  }
  return patterns.some((pattern) => pattern.test(prop));
}

export function isPropInBlackList(prop: string, patterns: RegExp[]): boolean {
  if (patterns.length === 0) {
    return false;
  }
  return patterns.some((pattern) => pattern.test(prop));
}

export function isSelectorInBlackList(selector: string, patterns: RegExp[]): boolean {
  if (patterns.length === 0) {
    return false;
  }
  return patterns.some((pattern) => pattern.test(selector));
}

export function isInMediaQuery(rule: Rule): boolean {
  let current: Rule['parent'] | Document = rule.parent;
  while (current) {
    if (current.type === 'atrule' && current.name === 'media') {
      return true;
    }
    current = current.parent;
  }
  return false;
}
