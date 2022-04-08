import { Alert, Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { useState } from "react";
import { useNavigatorOnLine } from "../utils/useOnlineStatus";

const TabItem = styled(Tab)(({ theme }) => ({
  minWidth: 50,
  maxWidth: 72,

  [theme.breakpoints.up("lg")]: {
    minWidth: 50,
    maxWidth: 120,
  },
}));

const Header = ({ message, auth, value, setValue, setTabIndex }) => {
  const [weatherData, setWeatherData] = useState("");
  const formatTime = "ddd DD MMM";
  const format = "YYYY-MM-DD HH:mm:ss";

  dayjs.locale("fr");
  dayjs.extend(isBetween);
  dayjs.extend(customParseFormat);

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

  return (
    <Box backgroundColor="white" sx={{ p: 0, m: 0 }}>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ p: 0 }}
      >
        <Grid item md={4}>
          <Tabs
            /*     sx={{ maxWidth: 200 }} */
            textColor="secondary"
            indicatorColor="secondary"
            orientation="horizontal"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <TabItem
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
            <TabItem
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
            <TabItem label="À faire" {...a11yProps(2)} />
            <TabItem label="Semaine" {...a11yProps(3)} />
          </Tabs>
        </Grid>

        <Grid
          item
          md={4}
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
              p={"8px"}
              sx={{
                fontSize: { xs: 11, lg: 18 },
                /*      borderRadius: 1, */
                padding: "8px 8px",
                whiteSpace: "pre-wrap",
              }}
            >
              {message[0].fields.Message}
            </Typography>
          )}
        </Grid>

        <Grid item md={4}>
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
              <strong>Lorem ipsum dolor </strong>
              <br />
              <strong>...</strong>
            </Typography>
            <Box sx={{ float: "right", maxWidth: { xs: "48px", lg: "100px" } }}>
              <img src="/qr-mobile.png" style={{ maxWidth: "100%" }} />
            </Box>

            <Box
              style={{
                /*  marginTop: "2rem", */
                textAlign: "right",
              }}
            >
              {!isOnline && (
                <Box sx={{}}>
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
