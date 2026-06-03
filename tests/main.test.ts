import postcss from 'postcss';
import { test, expect } from 'vitest';

import px2unit from '@/main';

test('converts px to rem', async () => {
  const css = `.test { width: 32px; height: 16px; font-size: 14px; }`;
  const result = await postcss([px2unit()]).process(css, { from: undefined });

  expect(result.css).toContain('2rem');
  expect(result.css).toContain('1rem');
  expect(result.css).toContain('0.875rem');
});

test('converts px to vw', async () => {
  const css = `.test { width: 32px; }`;
  const result = await postcss([px2unit({ unit: 'vw', rootValue: 375 })]).process(css, {
    from: undefined,
  });

  expect(result.css).toContain('8.53333vw');
});

test('respects minPixelValue', async () => {
  const css = `.test { border-width: 1px; margin: 0.5px; }`;
  const result = await postcss([px2unit({ minPixelValue: 2 })]).process(css, { from: undefined });

  expect(result.css).toContain('1px');
  expect(result.css).toContain('0.5px');
});

test('excludes files by path', async () => {
  const css = `.test { width: 32px; }`;
  const result = await postcss([px2unit({ exclude: /vendor/ })]).process(css, {
    from: '/path/to/vendor/style.css',
  });

  expect(result.css).toContain('32px');
});

test('does not exclude files that do not match path pattern', async () => {
  const css = `.test { width: 32px; }`;
  const result = await postcss([px2unit({ exclude: /vendor/ })]).process(css, {
    from: '/path/to/src/style.css',
  });

  expect(result.css).toContain('2rem');
});

test('converts px inside media queries when mediaQuery option is true', async () => {
  const css = `@media screen and (min-width: 768px) { .test { width: 32px; } }`;
  const result = await postcss([px2unit({ mediaQuery: true })]).process(css, { from: undefined });

  expect(result.css).toContain('2rem');
});

test('does not convert px inside media queries by default', async () => {
  const css = `@media screen and (min-width: 768px) { .test { width: 32px; } }`;
  const result = await postcss([px2unit()]).process(css, { from: undefined });

  expect(result.css).toContain('32px');
});
