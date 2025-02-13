import express from "express";
import { ExerciseTrackerInputs } from "../exerciseCalculator";
import { calculateExercises } from "../exerciseCalculator";
import { includesNonNumber } from "../utils";

export const exercisesRouter = express.Router();

exercisesRouter.post("/", (req, res) => {
  const { exerciseHoursPerDay, target } = req.body as ExerciseTrackerInputs;

  console.log("exerciseHoursPerDay", exerciseHoursPerDay);
  console.log("target", target);

  if (!exerciseHoursPerDay || !target) {
    res.send({
      error: "missing parameters; exerciseHoursPerDay and target are required",
    });
    return;
  }

  if (includesNonNumber(exerciseHoursPerDay) || isNaN(Number(target))) {
    res.send({
      error: "malformatted parameters",
    });
    return;
  }

  const exercisesResult = calculateExercises(exerciseHoursPerDay, target);

  res.send(exercisesResult);
});
