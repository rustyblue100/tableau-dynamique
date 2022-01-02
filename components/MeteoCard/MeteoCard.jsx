import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeatherImg from "./TempToImage";
import Grid from "@mui/material/Grid";

function MeteoCard(props) {
  const { dt, weather, temp } = props.dataWeather;

  let newDate = new Date();
  const weekday = dt * 1000;
  newDate.setTime(weekday);

  return (
    <Box ml={1} my={3}>
      <Typography variant="body1" sx={{ textAlign: "left" }}>
        <div>{props.index === 0 ? "Aujourd'hui" : "Demain"}</div>
        <Grid container alignItems="center">
          <Grid item mr={3}>
            <div>{Math.round(temp.day)} °C</div>
          </Grid>
          <Grid item>
            <WeatherImg weather={weather} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>{weather[0].description}</Grid>
        </Grid>
      </Typography>
    </Box>
  );
}

export default MeteoCard;
