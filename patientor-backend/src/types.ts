import { z } from "zod";
import { PatientDataSchema } from "./utils/newPatient";

// export type Gender = "male" | "female" | "other";
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type RestrictedPatientData = Omit<Patient, "ssn">;

// export type ParsedPatientData = Omit<Patient, "id">;
export type ParsedPatientData = z.infer<typeof PatientDataSchema>;
