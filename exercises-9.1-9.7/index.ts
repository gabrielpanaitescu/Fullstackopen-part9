import express from "express";
import { bmiRouter } from "./controllers/bmi";
import { exercisesRouter } from "./controllers/exercises";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.use("/bmi", bmiRouter);
app.use("/exercises", exercisesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
