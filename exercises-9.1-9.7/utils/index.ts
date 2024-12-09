export const includesNonNumber = (args: string[]): boolean => {
  return args.some((arg) => isNaN(Number(arg)));
};

export const isNotNumber = (value: any) => {
  return isNaN(Number(value));
};
