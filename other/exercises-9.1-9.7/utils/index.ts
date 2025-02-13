export const includesNonNumber = (args: string[] | number[]): boolean => {
  return args.some((arg) => isNaN(Number(arg)));
};

export const isNotNumber = (value: string) => {
  return isNaN(Number(value));
};
