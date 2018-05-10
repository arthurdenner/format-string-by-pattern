# format-string-by-pattern

## Overview

This module consists on a function that takes a pattern and a value and then returns this value formatted according to the pattern. It probably won't work with every pattern tho.

## Why?

I was writing one specific function to each formatted value I had to obtain from an input and that sucks, so I decided to try write a function to format any value based on any pattern. This is my attempt. 😃

## Other solutions

There is probably other solutions to these problems. If you know any other solution, feel free to open a PR adding it to the README.md.

## Usage

```js
const formatStringByPattern = require('format-string-by-pattern');

formatStringByPattern('YYYY-MM-DD', '20180508');
// '2018-05-08'

formatStringByPattern('2018-05-08', '20151217');
// '2015-12-17'

// It works with curry too
const someFormat = formatStringByPattern('00.00');
someFormat(1234);
// 12.34
```

> NOTE: The returned value will be sliced to the size of the pattern.

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
