import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BalanceProvider } from "./Services/BalanceContext.jsx";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#05223b",
    },
    secondary: {
      main: "#EEE2B1",
    },
    tertiary: {
      main: "#FFFFFF",
    },
    background: {},
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(130deg,#ffffff 20%, #a6cdf7 140%)",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BalanceProvider>
        <App />
      </BalanceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
