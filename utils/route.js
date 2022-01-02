import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./firebase";
import { FormControl, Box, TextField, Button, Grid } from "@mui/material/";

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();
    if (auth) {
      router.push("/films");
      return "Chargement...";
    }

    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth) {
      /*      router.push("/login"); */

      return (
        <>
          <h1>Accès non-permit</h1>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => router.push("/login")}
          >
            Connexion
          </Button>
        </>
      );
    }

    return <Component auth={auth} {...props} />;
  };
}
