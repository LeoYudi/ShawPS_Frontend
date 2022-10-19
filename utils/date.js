const parseNumber = n => {
  if (n < 10)
    return `0${n}`;
  else
    return n;
};

const parseDate = d => {
  const date = new Date(d);

  return `${parseNumber(date.getDate())}/${parseNumber(date.getMonth() + 1)}/${parseNumber(date.getFullYear())}`;
};


export { parseDate };