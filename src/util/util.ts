const getLongMonthDateStr = (dateObj: Date | null): string => {
  return dateObj
    ? new Date(dateObj).toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
};

const getDefaultDateStr = (dateObj: Date | null): string => {
  return dateObj
    ? new Date(dateObj).toLocaleDateString('default', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    : '';
};

const getDateStrForField = (dateObj: Date | null): string => {
  if (!dateObj) return null;

  const date = new Date(dateObj);

  const year: number = getNormalStr(date.getFullYear(), 4, '0');
  const month: number = getNormalStr(date.getMonth() + 1, 2, '0');
  const day: number = getNormalStr(date.getDate(), 2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Приводит строку к нормализованному виду, добавляя в начале charToRepeat, если длина меньше требуемой
 * @param input исходная строка
 * @param requiredLength требуемая длина
 * @param charToRepeat символы для заполнения пустоты в начале
 *
 * @return нормализованная строка
 */
const getNormalStr = (
  input: string | number,
  requiredLength: number,
  charToRepeat: string,
): string => {
  if (typeof input === 'number') {
    input = input.toString();
  }
  if (input.length >= requiredLength) return input;

  return charToRepeat.repeat(requiredLength - input.length) + input;
};

export { getLongMonthDateStr, getDefaultDateStr, getDateStrForField };
