import patientsData from "../../data/patients";
import { ParsedPatientData, Patient, RestrictedPatientData } from "../types";
import { v1 as uuid } from "uuid";

const getRestrictedPatientsData = (): RestrictedPatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: ParsedPatientData): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [],
  };

  patientsData.push(newPatient);

  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const foundPatient = patientsData.find((patient) => patient.id === id);

  return foundPatient;
};

export default {
  getRestrictedPatientsData,
  addPatient,
  getPatient,
};
