import { LoadingButton } from "@mui/lab";
import React from "react";

const BlackButton = (props) => {
  const { children, loading, backgroundColor, color, LeftIcon, RightIcon } =
    props;
  return (
    <>
      <LoadingButton
        loadingPosition="end"
        type="submit"
        loading={loading}
        disabled={loading}
        sx={{
          fontSize: {
            md: "14px",
            xs: "10px",
          },
          fontWeight: "bold",
          padding: "5px 30px",
          border: "1px solid #ABE900",
          backgroundColor: backgroundColor || "#000000",
          color: color || "#fff",

          "&:hover": {
            backgroundColor: backgroundColor || "#000000",
            color: color || "#ABE900",
          },
        }}
        {...props}
      >
        {LeftIcon ?? false}
        {loading ? "Processing" : children}
        {RightIcon ?? false}
      </LoadingButton>
    </>
  );
};
export default BlackButton;
