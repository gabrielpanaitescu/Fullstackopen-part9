import { z } from "zod";
import { Gender } from "../types";
import { EntrySchema } from "./newEntry";

export const PatientDataSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});
