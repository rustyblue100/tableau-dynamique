import "../styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "../Auth";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 980,
      xl: 3200,
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
      fontSize: 10,
      lineHeight: 1.25,
    },
    body2: {
      fontSize: 13,
    },

    marquee: { fontSize: 10 },
    button: { fontSize: 8, padding: 0 },
    regie: {
      fontSize: 6,
      fontWeight: 400,
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
