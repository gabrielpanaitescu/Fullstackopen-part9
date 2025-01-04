import { z } from "zod";
import { HealthCheckRating } from "../types";

export const EntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  employerName: z.string().optional(),
  sickLeave: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
  discharge: z.object({ date: z.string(), criteria: z.string() }).optional(),
});
