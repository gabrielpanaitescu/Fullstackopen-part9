import { includesNonNumber } from "./utils";

interface BodyValues {
  weight: number;
  height: number;
}

const parseArgs = (args: string[]): BodyValues => {
  if (args.length < 2)
    throw new Error("Not enough data provided. Provide the height and weight");

  if (args.length > 2)
    throw new Error(
      "Too much data provided. Provide only the height and weight"
    );

  const values = args;

  if (includesNonNumber(values))
    throw new Error("Values must be of type Number");

  const height = Number(values[0]);
  const weight = Number(values[1]);

  return {
    weight,
    height,
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;

  const bmi = Math.round(weight / Math.pow(heightInMeters, 2));

  let res;

  if (bmi < 18.5) {
    res = "Underweight";
  } else if (bmi <= 24.9) {
    res = "Healthy";
  } else if (bmi <= 29.9) {
    res = "Overweight";
  } else if (bmi <= 39.9) {
    res = "Obese";
  } else if (bmi >= 40) {
    res = "Severe obesity";
  } else {
    throw new Error("Bad user input. Could not calculate BMI");
  }

  return res;
};

if (require.main === module) {
  console.log("script ran from cmd line");
  try {
    const { height, weight } = parseArgs(process.argv.slice(2));

    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = "Something wrong happened.";

    if (error instanceof Error) errorMessage += "Error: " + error.message;

    console.log(errorMessage);
  }
}
