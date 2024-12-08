export const includesNonNumber = (args: string[]): boolean => {
  return args.some((arg) => isNaN(Number(arg)));
};
