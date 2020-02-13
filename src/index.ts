function shouldAppendLastSeparator(current: string, pattern: string, lastSeparator: string) {
  return current.length + 1 === pattern.length && pattern.endsWith(lastSeparator);
}

function getFormattedString(pattern: string, value?: string | number) {
  if (!value) {
    return value;
  }

  const cleanValue = String(value).replace(/[^\da-zA-Z\n|]/g, '');
  const blockSizes = pattern
    .split(/[^\da-zA-Z\n|]/g)
    .filter(Boolean)
    .map(b => b.length);
  const separators = pattern.split(/[\da-zA-Z\n|]/g).filter(Boolean);
  const [firstSeparator] = separators;
  const lastSeparator = separators[separators.length - 1];

  if (pattern.startsWith(firstSeparator)) {
    const afterReduce = separators.reduce(
      (acc, cur, index) => {
        const curBlockSize = blockSizes[index];
        const beforeSlice = acc.value.slice(0, curBlockSize);
        const afterSlice = acc.value.slice(curBlockSize);
        const nextResult = beforeSlice ? acc.result.concat(cur, beforeSlice) : acc.result;

        return {
          result: nextResult,
          value: afterSlice,
        };
      },
      {
        result: '',
        value: cleanValue,
      }
    );

    const res = afterReduce.result.slice(0, pattern.length);

    if (shouldAppendLastSeparator(res, pattern, lastSeparator)) {
      return res.concat(lastSeparator);
    }

    return res;
  }

  const afterReduce = blockSizes.reduce(
    (acc, cur, index) => {
      const curSeparator = separators[index] || '';
      const replace = `$1${curSeparator}$2`;
      const curSlice = cur + acc.prevSlice + acc.prevSeparator.length;
      const curRegex = new RegExp(`(.{${curSlice}})(.)`);
      const curValue = acc.value.replace(curRegex, replace);

      return {
        prevSeparator: curSeparator,
        prevSlice: curSlice,
        value: curValue,
      };
    },
    {
      prevSeparator: '',
      prevSlice: 0,
      value: cleanValue,
    }
  );

  const res = afterReduce.value.slice(0, pattern.length);

  if (shouldAppendLastSeparator(res, pattern, lastSeparator)) {
    return res.concat(lastSeparator);
  }

  return res;
}

function formatStringByPattern(pattern: string): (value?: string | number) => string;
function formatStringByPattern(pattern: string, value: string | number): string;
function formatStringByPattern(pattern: string, value?: string | number) {
  return value === undefined
    ? (curriedValue: string | number) => getFormattedString(pattern, curriedValue)
    : getFormattedString(pattern, value);
}

export default formatStringByPattern;
