import { includesNonNumber } from "./utils";

interface ExerciseTracker {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseTrackerInputs {
  exerciseHoursPerDay: number[];
  target: number;
}

const parseArgs = (args: string[]): ExerciseTrackerInputs => {
  if (args.length < 5)
    throw new Error(
      "Please enter at least 3 values. One for the target and at least two corresponding to: exercise hours/day"
    );

  const values = args.slice(2);

  if (includesNonNumber(values)) throw new Error("Values must be numbers");

  const numberValues = values.map((arg) => Number(arg));
  const target = numberValues[0];
  const exerciseHoursPerDay = numberValues.slice(1);

  return {
    exerciseHoursPerDay,
    target,
  };
};

const calculateExercises = (
  exerciseHoursPerDay: number[],
  target: number
): ExerciseTracker => {
  const periodLength = exerciseHoursPerDay.length;
  const trainingDays = exerciseHoursPerDay.filter((hours) => hours > 0).length;

  const average =
    exerciseHoursPerDay.length > 0
      ? exerciseHoursPerDay.reduce((accum, currVal) => {
          return accum + currVal;
        }, 0) / exerciseHoursPerDay.length
      : 0;

  const success = average > target ? true : false;

  let rating, ratingDescription;

  if (average < 1) {
    rating = 1;
  } else if (average <= 1.99) {
    rating = 2;
  } else {
    rating = 3;
  }

  switch (rating) {
    case 1:
      ratingDescription = "Impressive";
      break;
    case 2:
      ratingDescription = "Perfect";
      break;
    case 3:
      ratingDescription = "Wicked sick";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHoursPerDay, target } = parseArgs(process.argv);

  console.log(calculateExercises(exerciseHoursPerDay, target));
} catch (error) {
  let errorMessage = "Something went wrong";

  if (error instanceof Error) errorMessage += " Error: " + error.message;

  console.log(errorMessage);
}
