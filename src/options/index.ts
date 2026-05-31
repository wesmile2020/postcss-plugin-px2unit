export interface Options {
  /** Target unit to convert to */
  unit?: 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax';
  /** Base font size for rem calculation (default: 16) */
  ratio?: number;
  /** Viewport width for vw/vmin/vmax calculation (default: 375) */
  viewportWidth?: number;
  /** Viewport height for vh/vmin/vmax calculation (default: 667) */
  viewportHeight?: number;
  /** Minimum pixel value to convert (default: 1) */
  minPixelValue?: number;
  /** Selectors to exclude from conversion */
  exclude?: RegExp | string[];
}

export type RequiredOptions = Required<Options>;

export const defaultOptions: RequiredOptions = {
  unit: 'rem',
  ratio: 16,
  viewportWidth: 375,
  viewportHeight: 667,
  minPixelValue: 1,
  exclude: [],
};
