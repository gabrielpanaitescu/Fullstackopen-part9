import { Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) throw new Error("Missing id");
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (
            error?.response?.data &&
            typeof error.response.data === "string"
          ) {
            console.log("Axios error: ", error);
          } else {
            console.log("Unrecognized axios error");
          }
        } else {
          console.log("Unknown error: ", error);
        }
      }
    };

    void fetchPatient();
  }, [id]);

  if (!patient) return;

  return (
    <Stack marginTop={3} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="h4" component="h4">
          {patient.name}
        </Typography>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : null}
      </Stack>
      <Divider />
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
    </Stack>
  );
};
