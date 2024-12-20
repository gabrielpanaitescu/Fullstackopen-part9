import express, { Response } from "express";
import patientService from "../services/patientService";
import { RestrictedPatientData } from "../types";

export const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<RestrictedPatientData[]>) => {
  res.send(patientService.getRestrictedPatientsData());
});
