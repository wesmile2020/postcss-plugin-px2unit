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
}

export type RequiredOptions = Required<Options>;

export const defaultOptions: RequiredOptions = {
  unit: 'rem',
  precision: 5,
  rootValue: 16,
  minPixelValue: 1,
  exclude: [],
};
