import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { ParsedPatientData, Patient, RestrictedPatientData } from "../types";
import { PatientDataSchema } from "../utils/newPatient";
import { z } from "zod";

export const patientsRouter = express.Router();

const parsePatientMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    PatientDataSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.get("/", (_req, res: Response<RestrictedPatientData[]>) => {
  res.send(patientService.getRestrictedPatientsData());
});

patientsRouter.post(
  "/",
  parsePatientMiddleware,
  (
    req: Request<unknown, unknown, ParsedPatientData>,
    res: Response<Patient>
  ) => {
    const addedPatient = patientService.addPatient(req.body);

    res.json(addedPatient);
  }
);

patientsRouter.use(errorMiddleware);
