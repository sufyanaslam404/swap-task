import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CustomizeInput = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& label": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ABE900",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      // borderColor: "#ABE900",
    },
    "&:hover fieldset": {
      //  borderColor: "#ABE900",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ABE900",
    },
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ABE900",
      },
    },
  },
}));
