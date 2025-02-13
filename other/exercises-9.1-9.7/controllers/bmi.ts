import express from "express";
import { calculateBmi } from "../bmiCalculator";

export const bmiRouter = express.Router();

bmiRouter.get("/", (req, res) => {
  console.log("req.query", req.query);

  if (!req.query.height || !req.query.weight) {
    res.send({ error: "malformatted parameters. height or weight missing" });
    return;
  }
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({ error: "malformatted parameters. non number values provided" });
    return;
  }
  const bmi = calculateBmi(Number(height), Number(weight));

  res.send({ height, weight, bmi });
});
