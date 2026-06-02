export interface Options {
  /** Target unit to convert to (default: 'rem') */
  unit?: 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax';
  /** Root value for unit calculation, can be a function that receives filePath (optional) */
  rootValue?: number | ((filePath?: string) => number);
  /** Number of decimal places to keep (default: 5) */
  precision?: number;
  /** Minimum pixel value to convert (default: 1) */
  minPixelValue?: number;
  /** File paths to exclude from conversion (supports RegExp or string array) */
  exclude?: RegExp | string[];
  /** Property whitelist for conversion, empty array means all properties (default: []) */
  propWhiteList?: RegExp[];
  /** Property blacklist for conversion, empty array means no properties excluded (default: []) */
  propBlackList?: RegExp[];
  /** Selector blacklist for conversion, empty array means no selectors excluded (default: []) */
  selectorBlackList?: RegExp[];
  /** Whether to convert px in media queries (default: false) */
  mediaQuery?: boolean;
}

export type RequiredOptions = Required<Options>;

export const defaultOptions: RequiredOptions = {
  unit: 'rem',
  precision: 5,
  rootValue: 16,
  minPixelValue: 1,
  exclude: [],
  propWhiteList: [],
  propBlackList: [],
  selectorBlackList: [],
  mediaQuery: false,
};
