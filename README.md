# px2unit

[![npm version](https://img.shields.io/npm/v/px2unit.svg)](https://www.npmjs.com/package/px2unit)
[![license](https://img.shields.io/npm/l/px2unit.svg)](https://github.com/wesmile2020/postcss-plugin-px2unit/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/px2unit.svg)](https://www.npmjs.com/package/px2unit)

A PostCSS plugin that converts pixel values (`px`) to `rem`, `vw`, `vh`, `vmin`, or `vmax` units. Useful for responsive design and mobile adaptation.

## Features

- 🔄 Convert `px` to `rem`, `vw`, `vh`, `vmin`, or `vmax`
- 🎯 Dynamic `rootValue` per file (supports function)
- 🔧 Flexible filtering: file exclude, property whitelist/blacklist, selector blacklist
- 📱 Media query support (optional)
- ⚡ Precise control with `minPixelValue` and `precision` options

## Compatibility

| px2unit Version | PostCSS Version |
| --------------- | --------------- |
| 1.x             | 8.x             |

## Installation

```bash
npm install px2unit
# or
pnpm add px2unit
# or
yarn add px2unit
```

## Usage

### Basic

```javascript
// postcss.config.js
export default {
  plugins: {
    px2unit: {},
  },
};
```

### With Options

```javascript
// postcss.config.js
export default {
  plugins: {
    px2unit: {
      unit: 'vw',
      rootValue: 375, // Design draft width
      minPixelValue: 2,
      mediaQuery: true,
    },
  },
};
```

### Dynamic rootValue

```javascript
// postcss.config.js
export default {
  plugins: {
    px2unit: {
      rootValue: (filePath) => {
        if (filePath?.includes('mobile')) {
          return 375;
        }
        return 750;
      },
    },
  },
};
```

## Options

| Option              | Type                                        | Default | Description                                                               |
| ------------------- | ------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `unit`              | `'rem' \| 'vw' \| 'vh' \| 'vmin' \| 'vmax'` | `'rem'` | Target unit to convert to                                                 |
| `rootValue`         | `number \| ((filePath?: string) => number)` | `16`    | Root value for calculation. Can be a function for dynamic values per file |
| `precision`         | `number`                                    | `5`     | Number of decimal places to keep                                          |
| `minPixelValue`     | `number`                                    | `1`     | Minimum pixel value to convert. Values below this are kept as `px`        |
| `exclude`           | `RegExp \| string[]`                        | `[]`    | File paths to exclude from conversion                                     |
| `propWhiteList`     | `RegExp[]`                                  | `[]`    | Property whitelist. Empty array means all properties are converted        |
| `propBlackList`     | `RegExp[]`                                  | `[]`    | Property blacklist. Properties matching are NOT converted                 |
| `selectorBlackList` | `RegExp[]`                                  | `[]`    | Selector blacklist. Rules with matching selectors are NOT converted       |
| `mediaQuery`        | `boolean`                                   | `false` | Whether to convert `px` values inside media queries                       |

## Conversion Formula

| Unit                          | Formula                  | Example (rootValue: 16)            |
| ----------------------------- | ------------------------ | ---------------------------------- |
| `rem`                         | `px / rootValue`         | `32px → 2rem`                      |
| `vw` / `vh` / `vmin` / `vmax` | `(px / rootValue) * 100` | `32px → 8.5333vw` (rootValue: 375) |

## Examples

### Convert to rem (rootValue: 16)

**Input:**

```css
.container {
  width: 320px;
  height: 160px;
  padding: 16px;
  font-size: 14px;
  border: 1px solid #ccc;
}
```

**Output:**

```css
.container {
  width: 20rem;
  height: 10rem;
  padding: 1rem;
  font-size: 0.875rem;
  border: 1px solid #ccc; /* Not converted: < minPixelValue(1) */
}
```

### Convert to vw (rootValue: 375, mobile adaptation)

**Input:**

```css
.header {
  width: 375px;
  height: 50px;
}
```

**Output:**

```css
.header {
  width: 100vw;
  height: 13.3333vw;
}
```

### With propBlackList

```javascript
// postcss.config.js
export default {
  plugins: {
    px2unit: {
      propBlackList: [/border/], // Don't convert border-related properties
    },
  },
};
```

**Input:**

```css
.box {
  width: 100px;
  border: 1px solid #000;
}
```

**Output:**

```css
.box {
  width: 6.25rem;
  border: 1px solid #000; /* Excluded by propBlackList */
}
```

### With selectorBlackList

```javascript
// postcss.config.js
export default {
  plugins: {
    px2unit: {
      selectorBlackList: [/^.van-/], // Keep Vant UI components unchanged
    },
  },
};
```

## License

[MIT](LICENSE)

## Repository

[GitHub](https://github.com/wesmile2020/postcss-plugin-px2unit)
