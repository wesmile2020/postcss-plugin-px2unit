export interface Options {
  /** Target unit to convert to */
  unit?: 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax';
  /** Root value for unit calculation, can be a function that receives filePath (optional) */
  rootValue?: number | ((filePath?: string) => number);
  /** Minimum pixel value to convert (default: 1) */
  minPixelValue?: number;
  /** Selectors to exclude from conversion */
  exclude?: RegExp | string[];
}

export type RequiredOptions = Required<Options>;

export const defaultOptions: RequiredOptions = {
  unit: 'rem',
  rootValue: 16,
  minPixelValue: 1,
  exclude: [],
};
