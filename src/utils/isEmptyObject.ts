export const isEmptyObject = (object: Object): boolean => {
  return Object.keys(object).length === 0 ? true : false;
};
