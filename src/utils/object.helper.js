const isEmpty = (obj) => {
  const isNullOrUndefined = obj === null || obj === undefined;
  if (isNullOrUndefined) return true;
  return Object.keys(obj).length === 0;
};

export default isEmpty;
