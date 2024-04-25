import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Stack } from "@mui/material";

export default function Loading() {
  const [loading, setLoading] = React.useState(true);
  const timer = React.useRef();

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  return loading ? (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        zIndex: 1000000,
        bgcolor: "black",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        // border="1px solid red"
        width="100px"
        height="100px"
        sx={{ position: "relative" }}
      >
        {loading && (
          <CircularProgress
            size={128}
            sx={{
              color: green[500],
              position: "absolute",
              top: -10,
              left: -13,
              zIndex: 1,
            }}
          />
        )}
      </Stack>
    </Stack>
  ) : null;
}
