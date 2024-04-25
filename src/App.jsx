import "./App.css";
import Navbar from "./pages/Navbar";
import { responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme";
import { useState } from "react";
import Main from "./pages/Main/Main";
import Loading from "./loading";

function App() {
  const [mode, setMode] = useState(false);

  let theme = createCustomTheme(mode ? "light" : "dark");
  theme = responsiveFontSizes(theme);
  const themeToggler = () => {
    setMode(!mode);
  };
  return (
    <>
      <Loading />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar mode={mode} themeToggler={themeToggler} />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
