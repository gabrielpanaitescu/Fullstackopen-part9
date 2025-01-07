import { useState } from "react";
import { EntryFormValues, HealthCheckRating } from "../../types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  entryType: string;
  open: boolean;
  addNewEntry: (values: EntryFormValues) => void;
  cancelEntrySubmission: () => void;
}

interface HealthCheckRatingOption {
  label: string;
  value: HealthCheckRating;
}
const healthCheckRatingEntries = Object.entries(HealthCheckRating).slice(
  Math.ceil(Object.entries(HealthCheckRating).length / 2)
);

const healthCheckRatingOptions: HealthCheckRatingOption[] =
  healthCheckRatingEntries.map((arr) => {
    return {
      label: arr[0].toString(),
      value: arr[1] as HealthCheckRating,
    };
  });

export const AddEntryForm = ({
  entryType,
  open,
  addNewEntry,
  cancelEntrySubmission,
}: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseEntryValues = {
      date,
      specialist,
      description,
      healthCheckRating: healthCheckRating,
    };

    switch (entryType) {
      case "Hospital":
        break;

      case "HealthCheck":
        addNewEntry({
          ...baseEntryValues,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating,
        });
        break;
      case "OccupationalHealthcare":
        break;

      default:
        break;
    }

    setDate("");
    setSpecialist("");
    setDescription("");
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  const handleHealthRatingChange = (e: SelectChangeEvent<number>) => {
    if (typeof e.target.value === "number") {
      const value = e.target.value;
      const healthCheckRatingValue = Object.values(HealthCheckRating)
        .filter((v) => typeof v === "number")
        .find((v) => v === value);

      if (healthCheckRatingValue !== undefined) {
        console.log(healthCheckRatingValue);
        setHealthCheckRating(healthCheckRatingValue);
      }
    }
  };

  return (
    <>
      <Typography variant="h6">New Entry</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" alignItems="start" gap={1}>
          <TextField
            sx={{ alignSelf: "start" }}
            label="Date"
            type="date"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            label="Specialist"
            onChange={(e) => setSpecialist(e.target.value)}
          />
          <TextField
            required
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          {entryType === "HealthCheck" && (
            <FormControl>
              <InputLabel id="healthCheckRating" sx={{ fontSize: "0.9rem" }}>
                Health Check Rating
              </InputLabel>
              <Select
                sx={{ width: 200, fontSize: "0.85rem" }}
                labelId="healthCheckRating"
                label="Health Check Rating"
                value={healthCheckRating}
                onChange={handleHealthRatingChange}
              >
                {healthCheckRatingOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
        <Stack direction="row" gap={1} marginTop={1}>
          <Button
            color="error"
            size="small"
            variant="outlined"
            type="button"
            onClick={() => cancelEntrySubmission()}
          >
            cancel
          </Button>
          <Button size="small" variant="outlined" color="success" type="submit">
            submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
