function formatStringByPattern(pattern, value) {
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
        const nextResult = acc.result.concat(cur, beforeSlice);

        return {
          result: nextResult,
          value: afterSlice,
        };
      },
      {
        result: '',
        value: String(value),
      }
    );

    const result = afterReduce.result.slice(0, pattern.length);
    const [last] = result.slice(-1);

    // If the last character is a separator,
    // the value is partial, so we remove the character.
    // Useful for inputs.
    if (last.match(/[^\da-zA-Z\n|]/g)) {
      return result.slice(0, -1);
    }

    return result;
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
      value: String(value),
    }
  );

  return afterReduce.value.slice(0, pattern.length);
}

module.exports = formatStringByPattern;
