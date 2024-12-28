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
  };

  patientsData.push(newPatient);

  return newPatient;
};

export default {
  getRestrictedPatientsData,
  addPatient,
};
