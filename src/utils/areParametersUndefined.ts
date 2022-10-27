export const areParametersDefined = (...entries: unknown[]) => {
  let res = true;

  entries.forEach((entry) => {
    if (entry === undefined) res = false;
  });

  return res;
};
