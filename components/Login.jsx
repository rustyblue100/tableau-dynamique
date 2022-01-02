import { useState, useRef } from "react";
import {
  FormControl,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material/";
import { signup, login, logout, useAuth } from "../utils/firebase";
import { useRouter } from "next/router";
import { withPublic } from "../utils/route";
import Alert from "@mui/material/Alert";

import Image from "next/image";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  }

  async function handleLogin(e) {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/films");
      return "Loading";
    } catch (error) {
      alert(error);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setLoading(false);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: "100vh",
        }}
      >
        <Grid item md={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            position="relative"
          >
            <Image
              src="/logo.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Grid>
        <Grid
          container
          item
          md={6}
          alignContent="center"
          justifyContent="center"
          backgroundColor="#f7f7f8"
          height="100vh"
        >
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <FormControl sx={{ width: "60%" }} ref={formRef}>
                <Box>{currentUser?.email}</Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id="standard-email"
                    label="Email"
                    type="email"
                    variant="standard"
                    inputRef={emailRef}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id="standard-password"
                    label="Password"
                    type="password"
                    variant="standard"
                    inputRef={passwordRef}
                  />
                </Box>
                {/*                 <Box pt={2}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Enregistrement
                  </Button>
                </Box> */}

                <Box pt={2}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Connexion
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withPublic(Login);
