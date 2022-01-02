import "../styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "../Auth";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 3200,
    },
  },
  palette: {
    primary: {
      main: "#db4f44",
    },
  },
  typography: {
    fontFamily: "Helvetica Neue",
    h1: {
      fontSize: 48,
      fontWeight: 500,
      "@media (min-width:3200px)": { fontSize: 96 },
    },
    body1: {
      fontSize: 16,
      "@media (min-width:3200px)": { fontSize: 32 },
    },
    body2: {
      fontSize: 24,
      "@media (min-width:3200px)": { fontSize: 58 },
    },

    marquee: { fontSize: 18, "@media (min-width:3200px)": { fontSize: 36 } },
    button: { fontSize: 16, "@media (min-width:3200px)": { fontSize: 32 } },
    regie: {
      fontSize: 14,
      "@media (min-width:3200px)": { fontSize: 24 },
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
