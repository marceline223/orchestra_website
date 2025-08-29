const getDateStr = (dateObj: Date | null): string => {
  return dateObj
    ? new Date(dateObj).toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
};

export { getDateStr };
