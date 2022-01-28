import "../styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "../Auth";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 2400,
    },
  },

  palette: {
    primary: {
      main: "#db4f44",
    },

    secondary: {
      main: "#000000",
    },
    common: {
      black: "#222427",
    },
  },
  typography: {
    color: "#222427",
    fontFamily: "Helvetica Neue, Inter",
    h1: {
      color: "#222427",
      fontWeight: 500,
      fontSize: 20,
    },
    body1: {
      color: "#222427",
      fontSize: 12,
      ["@media screen and (max-width: 1920px)"]: {
        fontSize: 18,
      },

      ["@media screen and (max-width: 1200px)"]: {
        fontSize: 16,
      },
      lineHeight: 1.25,
    },
    body2: {
      fontSize: 15,

      ["@media screen and (max-width: 1920px)"]: {
        fontSize: 20,
      },

      ["@media screen and (max-width: 1200px)"]: {
        fontSize: 19,
      },
    },

    marquee: {
      fontSize: 13,
      ["@media screen and (max-width: 1920px)"]: {
        fontSize: 18,
      },

      ["@media screen and (max-width: 1200px)"]: {
        fontSize: 17,
      },
    },
    button: {
      fontSize: 8,
      padding: 0,

      ["@media screen and (max-width: 1920px)"]: {
        fontSize: 14,
      },
      ["@media screen and (max-width: 1200px)"]: {
        fontSize: 9,
      },
    },
    message: { fontSize: 12 },
    regie: {
      fontSize: 9,
      fontWeight: 400,
      ["@media screen and (max-width: 1920px)"]: {
        fontSize: 12,
      },

      ["@media screen and (max-width: 1200px)"]: {
        fontSize: 10,
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
