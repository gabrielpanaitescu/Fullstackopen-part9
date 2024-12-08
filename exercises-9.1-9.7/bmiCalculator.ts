import { includesNonNumber } from "./utils";

interface BodyValues {
  weight: number;
  height: number;
}

console.log(process.argv);

const parseArgs = (args: string[]): BodyValues => {
  if (args.length < 4)
    throw new Error("Not enough data provided. Provide the height and weight");

  if (args.length > 4)
    throw new Error(
      "Too much data provided. Provide only the height and weight"
    );

  const values = process.argv.slice(2);

  if (includesNonNumber(values))
    throw new Error("Values must be of type Number");

  const height = Number(values[0]);
  const weight = Number(values[1]);

  return {
    weight,
    height,
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;

  const bmi = Math.round(weight / Math.pow(heightInMeters, 2));

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi <= 24.9) {
    return "Healthy";
  } else if (bmi <= 29.9) {
    return "Overweight";
  } else if (bmi <= 39.9) {
    return "Obese";
  } else if (bmi >= 40) {
    return "Severe obesity";
  }
};

try {
  const { height, weight } = parseArgs(process.argv);

  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = "Something wrong happened.";

  if (error instanceof Error) errorMessage += "Error: " + error.message;

  console.log(errorMessage);
}
