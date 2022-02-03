import { Alert, Box, Grid, Paper, Typography, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigatorOnLine } from "../utils/useOnlineStatus";

const Header = ({ message, auth, value, setValue, setTabIndex }) => {
  const [weatherData, setWeatherData] = useState("");
  const formatTime = "ddd DD MMM";
  const format = "YYYY-MM-DD HH:mm:ss";

  dayjs.locale("fr");

  const isOnline = useNavigatorOnLine();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setTabIndex(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,

    textAlign: "right",
    lineHeight: 0.5,
  }));

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  /*   async function handleLogOut(e) {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  } */

  /*   useEffect(() => {
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
  }, []); */

  /*   function weather() {
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
  } */

  return (
    <Box backgroundColor="white" sx={{ p: 0, m: 0 }}>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ p: 0 }}
      >
        <Grid container item md={2} lg={4}>
          {/*       {weather()} */}

          <Item elevation={0}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              orientation="horizontal"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  dayjs(dayjs().format(format)).isBetween(
                    `${dayjs().format("YYYY-MM-DD")} 00:00`,
                    `${dayjs().format("YYYY-MM-DD")} 05:00`
                  )
                    ? dayjs().subtract(1, "days").format(formatTime)
                    : dayjs().format(formatTime)
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  dayjs(dayjs().format(format)).isBetween(
                    `${dayjs().format("YYYY-MM-DD")} 00:00`,
                    `${dayjs().format("YYYY-MM-DD")} 05:00`
                  )
                    ? dayjs().format(formatTime)
                    : dayjs().add(1, "days").format(formatTime)
                }
                {...a11yProps(1)}
              />
              <Tab label="À faire" {...a11yProps(2)} />
            </Tabs>
          </Item>
        </Grid>

        <Grid
          item
          md={8}
          lg={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message && message[0].fields.Publier && (
            <Typography
              variant="message"
              color="#ffffff"
              backgroundColor="#e00000"
              textAlign="center"
              display="flex"
              justifyContent="center"
              p={"5px"}
            >
              {message[0].fields.Message}
            </Typography>
          )}
        </Grid>

        <Grid item md={2} lg={4}>
          <Item
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0,
              pr: "4px",
              float: "right",
            }}
          >
            <Typography
              variant="regie"
              component="div"
              sx={{ pr: "8px", lineHeight: 1.25 }}
            >
              <strong>info@debonspetitsplats.com</strong>
              <br />
              <strong>1210@dbpp</strong>
            </Typography>
            <Box sx={{ float: "right", width: { sx: "48px", lg: "100px" } }}>
              <img
                src="/qr-mobile.png"
                style={{ maxWidth: "100%", minWidth: "48px" }}
              />
            </Box>

            <Box
              style={{
                /*  marginTop: "2rem", */
                textAlign: "right",
              }}
            >
              {!isOnline && (
                <Box sx={{}}>
                  <Alert variant="filled" severity="warning">
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
