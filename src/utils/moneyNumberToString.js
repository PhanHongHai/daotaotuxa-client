import numeral from 'numeral';

export default function moneyNumberToString(number,type) {
  let str;
  let suffix = '';
  if (number > 1000000000) {
    suffix = 'B';
    str = number / 1000000000;
  } else if (number > 1000000) {
    suffix = 'M';
    str = number / 1000000;
  } else if (number > 1000) {
    suffix = 'K';
    str = number / 1000;
  } else {
    suffix = type === 'number'? '': '$';
    str = Math.round(number);
  }
  const output = {
    number: numeral(str).format('0,0[.]00[0]'),
    suffix
  };
  return output;
}
