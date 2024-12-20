import { Diagnosis } from "../types";
import diagnosesData from "../../data/diagnoses";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};
