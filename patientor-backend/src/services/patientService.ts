import patientsData from "../../data/patients";
import { RestrictedPatientData } from "../types";

const getRestrictedPatientsData = (): RestrictedPatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getRestrictedPatientsData,
};
