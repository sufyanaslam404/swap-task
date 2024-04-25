import { createTheme, responsiveFontSizes } from "@mui/material";
export const createCustomTheme = (mode) => {
  let theme = createTheme({
    palette: {
      mode: mode,
      success: {
        main: mode === "light" ? "#181818" : "#00FE00",
      },
      primary: {
        main: "#ABE900",
      },
      customBlack: {
        main: "#0C0F15",
      },
      customWhite: {
        main: "#fff",
      },
      bitter: {
        main: "#262B26",
      },
      background: {
        default: mode === "light" ? "#EEEEEE" : "#070C0E",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#EEEEEE",
      },
      footerLink: {
        primary: mode === "light" ? "#000000" : "#D9D9D9",
      },
    },
    typography: {
      h1: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#181818" : "#D9D9D9",
        fontSize: "4.4rem", //70px
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#181818" : "#D9D9D9",
        fontSize: "2.3rem", //38px
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: "#ABE900",
        fontSize: "2rem",
        fontWeight: 700,
      },
      h4: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#181818" : "#ffffff",
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h5: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
        color: mode === "light" ? "#404040" : "#D9D9D9",
        fontSize: "1rem",
        fontWeight: 400,
      },
      h6: {
        fontFamily: ["Inter Variable", "sans-serif"].join(","),
        color: "#000000",
        fontSize: "1rem",
        fontWeight: 400,
      },
      subtitle1: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: mode === "light" ? "#404040" : "#D9D9D9",
        fontSize: "0.875rem",
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "1rem",
        lineHeight: 1.025,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "1rem",
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "0.875rem",
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
      caption: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
        fontWeight: 400,
        color: "white",
        fontSize: "0.75rem",
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#676767",
          },
          root: {
            [`&:hover .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "#ABE900",
            },
            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "#ABE900",
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
