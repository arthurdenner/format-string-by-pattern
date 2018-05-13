import test from 'ava';
import formatStringByPattern from '.';

// CPF is a brazilian identification number
test('It should format a CPF correctly', t => {
  const result = formatStringByPattern('000.000.000-00', '31362552836');

  t.is(result, '313.625.528-36');
});

test('It should format a partial CPF correctly', t => {
  const result = formatStringByPattern('000.000.000-00', '3136255');

  t.is(result, '313.625.5');
});

// CNPJ is an identification number issued to Brazilian companies
test('It should format a CNPJ correctly', t => {
  const result = formatStringByPattern('00.000.000/0000-00', 46878657000157);

  t.is(result, '46.878.657/0001-57');
});

test('It should format a partial CNPJ correctly', t => {
  const result = formatStringByPattern('00.000.000/0000-00', 468786);

  t.is(result, '46.878.6');
});

test('It should format a date in YYYY-MM-DD correctly', t => {
  const result = formatStringByPattern('YYYY-MM-DD', 20180508);

  t.is(result, '2018-05-08');
});

test('It should format a partial date in YYYY-MM-DD correctly', t => {
  const result = formatStringByPattern('YYYY-MM-DD', 201805);

  t.is(result, '2018-05');
});

test('It should format a date in DD/MM/YYYY correctly', t => {
  const result = formatStringByPattern('DD/MM/YYYY', '08052018');

  t.is(result, '08/05/2018');
});

test('It should format a partial date in DD/MM/YYYY correctly', t => {
  const result = formatStringByPattern('DD/MM/YYYY', '080');

  t.is(result, '08/0');
});

test('It should format a telephone number correctly', t => {
  const result = formatStringByPattern('(00) 00000-0000', 82999999999);

  t.is(result, '(82) 99999-9999');
});

test('It should format a partial telephone number correctly', t => {
  const result = formatStringByPattern('(00) 00000-0000', 82999);

  t.is(result, '(82) 999');
});

test('It should format a landline number correctly', t => {
  const result = formatStringByPattern('(00) 0000-0000', 8299999999);

  t.is(result, '(82) 9999-9999');
});

test('It should format a partial landline number correctly', t => {
  const result = formatStringByPattern('(00) 0000-0000', 829999);

  t.is(result, '(82) 9999');
});

test('It should format a international number correctly', t => {
  const result = formatStringByPattern('+00 00 00000-0000', 5582999999999);

  t.is(result, '+55 82 99999-9999');
});

test('It should format a partial international number correctly', t => {
  const result = formatStringByPattern('+00 00 00000-0000', 55829999);

  t.is(result, '+55 82 9999');
});

test('It should format by a weird pattern correctly', t => {
  const result = formatStringByPattern('A~BC*D!EF', 'ABCDEF');

  t.is(result, 'A~BC*D!EF');
});

test('It should slice the string if the value is longer than the pattern', t => {
  const result = formatStringByPattern('00.000.000', 1234567890);

  t.is(result, '12.345.678');
});

test('It should work with curried value', t => {
  const formatToCPF = formatStringByPattern('000.000.000-00');
  const result = formatToCPF(76316204230);

  t.is(result, '763.162.042-30');
});

test('It should return an empty string if no value is provided', t => {
  const formatToCPF = formatStringByPattern('(999) 999-9999');
  const result = formatToCPF();

  t.is(result, '');
});

test('It should return an empty string if the value is empty', t => {
  const formatToCPF = formatStringByPattern('(999) 999-9999');
  const result = formatToCPF('');

  t.is(result, '');
});
