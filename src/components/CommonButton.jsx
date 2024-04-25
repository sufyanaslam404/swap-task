import { LoadingButton } from "@mui/lab";
import React from "react";

const CommonButton = (props) => {
  const { children, loading, backgroundColor, color, LeftIcon, RightIcon } =
    props;
  return (
    <>
      <LoadingButton
        loading={loading}
        disabled={loading}
        sx={{
          fontSize: {
            md: "14px",
            xs: "10px",
          },
          fontWeight: "bold",
          padding: "5px 30px",

          backgroundColor: backgroundColor || "#ABE900",
          color: color || "#000000",

          "&:hover": {
            backgroundColor: backgroundColor || "#C6F051",
            color: color || "#fff",
          },
          "&:disabled": {
            backgroundColor: backgroundColor || "#C6F051",
            color: color || "#fff",
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
export default CommonButton;
