# postcss-plugin-px2unit

A PostCSS plugin that converts pixel values to rem, vw, vh, vmin, or vmax units.

## Installation

```bash
npm install postcss-plugin-px2unit
# or
pnpm add postcss-plugin-px2unit
# or
yarn add postcss-plugin-px2unit
```

## Usage

### Basic

```javascript
// postcss.config.js
export default {
  plugins: {
    'postcss-plugin-px2unit': {},
  },
};
```

### With Options

```javascript
// postcss.config.js
export default {
  plugins: {
    'postcss-plugin-px2unit': {
      unit: 'rem',
      rootValue: 16,
    },
  },
};
```

## Options

| Option          | Type                                        | Default | Description                                                                          |
| --------------- | ------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `unit`          | `'rem' \| 'vw' \| 'vh' \| 'vmin' \| 'vmax'` | `'rem'` | Target unit                                                                          |
| `rootValue`     | `number \| ((filePath?: string) => number)` | `16`    | Root value for unit calculation, can be a function that receives filePath (optional) |
| `minPixelValue` | `number`                                    | `1`     | Minimum pixel value to convert                                                       |
| `exclude`       | `RegExp \| string[]`                        | `[]`    | Selectors to exclude                                                                 |

## Conversion Formula

All units use the same `rootValue` for calculation:

| Unit                          | Formula                  |
| ----------------------------- | ------------------------ |
| `rem`                         | `px / rootValue`         |
| `vw` / `vh` / `vmin` / `vmax` | `(px / rootValue) * 100` |

## Examples

### Input CSS

```css
.box {
  width: 32px;
  height: 48px;
  margin: 16px;
  padding: 8px;
  font-size: 14px;
}
```

### Output (unit: 'rem', rootValue: 16)

```css
.box {
  width: 2rem;
  height: 3rem;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 0.875rem;
}
```

### Output (unit: 'vw', rootValue: 375)

```css
.box {
  width: 8.5333vw;
  height: 12.8vw;
  margin: 4.2667vw;
  padding: 2.1333vw;
  font-size: 3.7333vw;
}
```

## License

MIT
