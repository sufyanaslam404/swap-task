import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import bnb from "./assets/bnb.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Tokenbox = ({
  text,
  slect,
  setslect,
  fromAmount,
  setFromAmount,
  toAmount,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let matches = useMediaQuery("(max-width:760px)");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const inputStyle = {
    width: "100%",
    borderColor: "transparent",
    fontFamily: "'Nunito'",
    fontStyle: "normal",
    fontWeight: 400,
    background: "transparent",
    color: "white",
    fontSize: "15px",
    height: "50px",
    outline: "none",
  };

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(119.36deg, rgba(37, 45, 48, 0.7) 0%, rgba(140, 140, 140, 0.40) 14.84%, gray 47.66%, rgba(37, 45, 48, 0.7) 100%)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "30px",
          p: { xs: "15px", sm: "20px" },
        }}
      >
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={7}>
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "17px",
                }}
              >
                {text}
              </Typography>
            </Box>
            <Box mt={2}>
              <input
                style={inputStyle}
                value={text == "From" ? fromAmount : toAmount}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                }}
                type="text"
                // placeholder="Enter your text"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                background:
                  "linear-gradient(119.36deg, #0D2304 0%, #050B10 14.84%, gray 47.66%, #0D2304 100%)",
                borderRadius: "10px",
                p: "10px",
                display: "flex",
                alignItems: "center",
                height: "50px",
              }}
            >
              <Box px={{ md: "10px", xs: "3px" }}>
                <img src={bnb} alt="" width={matches ? 15 : 25} />
              </Box>
              <Box
                px={{ md: "10px", xs: "3px" }}
                sx={{
                  fontFamily: "'Nunito'",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: { xs: "15px", sm: "18px" },
                  color: "white",
                }}
              >
                {text == "From" ? slect : "USDT"}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Tokenbox;
