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

    return afterReduce.result.slice(0, pattern.length);
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

  return afterReduce.value.slice(0, pattern.length);
}

function formatStringByPattern(pattern: string): (value?: string | number) => string;
function formatStringByPattern(pattern: string, value: string | number): string;
function formatStringByPattern(pattern: string, value?: string | number) {
  return value === undefined
    ? (curriedValue: string | number) => getFormattedString(pattern, curriedValue)
    : getFormattedString(pattern, value);
}

export default formatStringByPattern;