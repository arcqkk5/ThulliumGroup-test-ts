import { TextField } from "@mui/material";
import "./filter.scss";

interface FilterProps {
  handleChange(value: string): void;
}

export const Filter: React.FC<FilterProps> = (props) => {
  return (
    <TextField
      id="filter-id"
      label="Enter ID"
      variant="outlined"
      className="group__input"
      onChange={(event) => props.handleChange(event.target.value)}
    />
  );
};
