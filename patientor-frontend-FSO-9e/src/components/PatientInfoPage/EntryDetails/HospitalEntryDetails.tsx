import { Paper, Typography } from "@mui/material";
import { HospitalEntry } from "../../../types";

interface Props {
  entry: HospitalEntry;
}

export const HospitalEntryDetails = ({ entry }: Props) => {
  if (!entry.discharge) return null;
  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Discharge
      </Typography>
      <Typography variant="body1">
        Criteria: {entry.discharge.criteria}
      </Typography>
      <Typography variant="body1">Date: {entry.discharge.date}</Typography>
    </Paper>
  );
};
