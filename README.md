<h1 align="center">
  format-string-by-pattern
</h1>

<p align="center">
<a href="https://www.npmjs.org/package/format-string-by-pattern"><img src="https://img.shields.io/npm/v/format-string-by-pattern.svg?style=flat" alt="npm"></a>
<a href="https://david-dm.org/arthurdenner/format-string-by-pattern"><img src="https://david-dm.org/arthurdenner/format-string-by-pattern/status.svg" alt="dependencies Status"></a>
<a href="https://unpkg.com/format-string-by-pattern/dist/format-string-by-pattern.umd.js"><img src="https://img.badgesize.io/https://unpkg.com/format-string-by-pattern/dist/format-string-by-pattern.umd.js?compression=gzip" alt="gzip size"></a>
<a href="https://packagephobia.now.sh/result?p=format-string-by-pattern"><img src="https://packagephobia.now.sh/badge?p=format-string-by-pattern" alt="install size"></a>
</p>

## Overview

This module consists on a function that receives a pattern and a value and returns this value formatted according to the pattern. It doesn't work with every pattern, but it works with a lot of use cases, especially if you build functions on top of this module.

## Install

```
yarn add format-string-by-pattern
```

```
npm i format-string-by-pattern
```

### UMD

```
<script src="https://unpkg.com/format-string-by-pattern/dist/format-string-by-pattern.umd.js"></script>
```

## Usage

```js
const formatStringByPattern = require('format-string-by-pattern');

formatStringByPattern('YYYY-MM-DD', '20180508');
// '2018-05-08'

formatStringByPattern('2018-05-08', '20151217');
// '2015-12-17'

const formatOnlyNumbers = anyString => {
  const onlyNumbers = anyString.replace(/[^\d]/g, '');

  return formatStringByPattern('999-999-9999', onlyNumbers);
};
formatOnlyNumbers('1A2B3C4D5E6F7G8H9');
// '123-456-789'

// It works with curry too
const someFormat = formatStringByPattern('00.00');
someFormat(1234);
// 12.34
```

> NOTE: The returned value will be sliced to the size of the pattern.

This library is pretty useful with forms, where you need to parse the input values.
See the usage with the [react-final-form](https://github.com/final-form/react-final-form) library [here](https://codesandbox.io/s/no20p7z3l).

## API

### formatStringByPattern(pattern, valueToFormat)

Returns a `string`.

#### pattern

Type: `string`

A string where anything that is not a number or letter will be treated as a separator.

#### valueToFormat

Type: `string` or `number`

A value to be formatted.

## License

MIT © [Arthur Denner](https://github.com/arthurdenner/)
