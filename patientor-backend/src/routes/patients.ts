import express, { Response } from "express";
import patientService from "../services/patientService";
import { RestrictedPatientData } from "../types";
import { parseNewPatientData } from "../utils/newPatient";

export const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<RestrictedPatientData[]>) => {
  res.send(patientService.getRestrictedPatientsData());
});

patientsRouter.post("/", (req, res) => {
  try {
    const parsedPatientData = parseNewPatientData(req.body);
    const addedPatient = patientService.addPatient(parsedPatientData);

    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});
