import SquareIcon from "@mui/icons-material/Square";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Alert,
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import MeteoCard from "./MeteoCard/MeteoCard";
import { useNavigatorOnLine } from "../utils/useOnlineStatus";
import { logout } from "../utils/firebase";
import router from "next/router";

const Header = ({ message, auth }) => {
  const [weatherData, setWeatherData] = useState("");
  const formatTime = "HH:mm";

  const isOnline = useNavigatorOnLine();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    lineHeight: 0.5,
  }));

  async function handleLogOut(e) {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=45.508888&lon=-73.561668&lang=fr&exclude=hourly&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAPAPI}`
        )
        .then((res) => {
          setWeatherData(res.data.daily.slice(0, 2));
        })
        .catch((error) => console.log(error));
    };

    fetchData();

    setInterval(() => {
      fetchData();
    }, 3600000);

    return () => {
      fetchData();
    };
  }, []);

  function weather() {
    return (
      weatherData &&
      weatherData.map((d, i) => (
        <Grid item xs={6} key={i}>
          <Item elevation={0} style={{ textAlign: "center" }}>
            <MeteoCard dataWeather={d} index={i} key={i} />
          </Item>
        </Grid>
      ))
    );
  }
  return (
    <Box>
      {message && message[0].fields.Publier && (
        <Marquee
          gradient={false}
          speed={50}
          style={{
            backgroundColor: "",
            borderBottom: "1px solid lightgray",
            padding: ".5rem 0",
          }}
        >
          <Typography variant="marquee" color="#db4f44">
            {message[0].fields.Message}
          </Typography>
        </Marquee>
      )}
      <Grid container alignItems="center">
        <Grid container item md={3} xl={3}>
          {weather()}
        </Grid>

        <Grid
          item
          md={6}
          xl={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Item elevation={0}>
            <Typography variant="h1"> {moment().format(formatTime)}</Typography>
          </Item>
        </Grid>

        <Grid item md={3} xl={3}>
          <Item elevation={0}>
            <Box>
              <List dense={false} sx={{ float: "right", pt: 0, mr: 5 }}>
                <ListItemButton sx={{ p: 0 }}>
                  <SquareIcon sx={{ color: "#f1e577", mr: 1, p: 0 }} />
                  <ListItemText primary="à confirmé" />
                </ListItemButton>
                <ListItemButton sx={{ p: 0 }}>
                  <SquareIcon sx={{ color: "#b3dda8", mr: 1, p: 0 }} />
                  <ListItemText primary="confirmé" />
                </ListItemButton>
                <ListItemButton sx={{ p: 0 }}>
                  <SquareIcon sx={{ color: "#dda8a8", mr: 1, p: 0 }} />
                  <ListItemText primary="urgent" />
                </ListItemButton>
                <ListItemButton sx={{ p: 0 }}>
                  <LogoutIcon sx={{ mr: 1, p: 0 }} color="secondary" />
                  <ListItemText primary="déconnexion" onClick={handleLogOut} />
                </ListItemButton>
              </List>
            </Box>

            <Box
              style={{
                marginTop: "2rem",
                textAlign: "right",
              }}
            >
              {!isOnline && (
                <Box
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  <Alert variant="filled" severity="error">
                    Offline
                  </Alert>
                </Box>
              )}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
