import formatStringByPattern from '.';

// CPF is a brazilian identification number
it('It should format a CPF correctly', () => {
  const result = formatStringByPattern('000.000.000-00', '31362552836');

  expect(result).toEqual('313.625.528-36');
});

it('It should format a partial CPF correctly', () => {
  const result = formatStringByPattern('000.000.000-00', '3136255');

  expect(result).toEqual('313.625.5');
});

// CNPJ is an identification number issued to Brazilian companies
it('It should format a CNPJ correctly', () => {
  const result = formatStringByPattern('00.000.000/0000-00', 46878657000157);

  expect(result).toEqual('46.878.657/0001-57');
});

it('It should format a partial CNPJ correctly', () => {
  const result = formatStringByPattern('00.000.000/0000-00', 468786);

  expect(result).toEqual('46.878.6');
});

it('It should format a date in YYYY-MM-DD correctly', () => {
  const result = formatStringByPattern('YYYY-MM-DD', 20180508);

  expect(result).toEqual('2018-05-08');
});

it('It should format a partial date in YYYY-MM-DD correctly', () => {
  const result = formatStringByPattern('YYYY-MM-DD', 201805);

  expect(result).toEqual('2018-05');
});

it('It should format a date in DD/MM/YYYY correctly', () => {
  const result = formatStringByPattern('DD/MM/YYYY', '08052018');

  expect(result).toEqual('08/05/2018');
});

it('It should format a partial date in DD/MM/YYYY correctly', () => {
  const result = formatStringByPattern('DD/MM/YYYY', '080');

  expect(result).toEqual('08/0');
});

it('It should format a telephone number correctly', () => {
  const result = formatStringByPattern('(00) 00000-0000', 82999999999);

  expect(result).toEqual('(82) 99999-9999');
});

it('It should format a partial telephone number correctly', () => {
  const result = formatStringByPattern('(00) 00000-0000', 82999);

  expect(result).toEqual('(82) 999');
});

it('It should format a landline number correctly', () => {
  const result = formatStringByPattern('(00) 0000-0000', 8299999999);

  expect(result).toEqual('(82) 9999-9999');
});

it('It should format a partial landline number correctly', () => {
  const result = formatStringByPattern('(00) 0000-0000', 829999);

  expect(result).toEqual('(82) 9999');
});

it('It should format a international number correctly', () => {
  const result = formatStringByPattern('+00 00 00000-0000', 5582999999999);

  expect(result).toEqual('+55 82 99999-9999');
});

it('It should format a partial international number correctly', () => {
  const result = formatStringByPattern('+00 00 00000-0000', 55829999);

  expect(result).toEqual('+55 82 9999');
});

it('It should format by a weird pattern correctly', () => {
  const result = formatStringByPattern('A~BC*D!EF', 'ABCDEF');

  expect(result).toEqual('A~BC*D!EF');
});

it('It should slice the string if the value is longer than the pattern', () => {
  const result = formatStringByPattern('00.000.000', 1234567890);

  expect(result).toEqual('12.345.678');
});

it('It should work with curried value', () => {
  const formatToCPF = formatStringByPattern('000.000.000-00');
  const result = formatToCPF(76316204230);

  expect(result).toEqual('763.162.042-30');
});

it("It should return the same value if it's an invalid value, an empty string or zero", () => {
  const formatToCPF = formatStringByPattern('(999) 999-9999');
  const undefinedValue = formatToCPF(undefined);

  expect(undefinedValue).toEqual(undefined);

  const emptyString = formatToCPF('');

  expect(emptyString).toEqual('');

  const zeroValue = formatToCPF(0);

  expect(zeroValue).toEqual(0);
});

it('It should work if used to build specific functions', () => {
  const formatOnlyNumbers = (anyString: string) => {
    const onlyNumbers = anyString.replace(/[^\d]/g, '');

    return formatStringByPattern('999-999-9999', onlyNumbers);
  };

  const result = formatOnlyNumbers('1A2B3C4D5E6F7G8H9');

  expect(result).toEqual('123-456-789');
});

describe('when the last character in pattern is a separator', () => {
  it('should format properly if pattern begins with a separator', () => {
    const result = formatStringByPattern('(999)', 123);

    expect(result).toEqual('(123)');
  });

  it("should format properly if pattern doesn't begin with a separator", () => {
    const result = formatStringByPattern('999)', 123);

    expect(result).toEqual('123)');
  });
});
