import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import { useViewport } from "../utils/hooks";
import Event from "./Event";
import TableHeadRow from "./TableHeadRow";
import TableSlide from "./TableSlide";
import Taches from "./Taches";
import moment from "moment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Events({
  events,
  eventsDemain,
  afaire,
  setTabIndex,
  message,
}) {
  const { width } = useViewport();
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setTabIndex(newValue);
  };

  const slideDataValues = [0, 5, 5, 10]; // Number of row per slide

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const group =
    afaire &&
    afaire.reduce((r, a) => {
      r[a.fields.Date] = [...(r[a.fields.Date] || []), a];
      return r;
    }, {});

  console.log(
    events /*  &&
      events.filter(
        (e) =>
          e.fields.Status === "Urgent" ||
          e.fields.Status === "Non-confirmé" ||
          e.fields.Status === "Confirmé"
      ) */
  );
  const formatTime = "dddd D MMM";

  return (
    <Container
      sx={{
        width: "100%",
        pt: 3,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      maxWidth="false"
      disableGutters
    >
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
        orientation="horizontal"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label={moment().format(formatTime)} {...a11yProps(0)} />
        <Tab
          label={moment().add(1, "days").format(formatTime)}
          {...a11yProps(1)}
        />
        <Tab label="À faire" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {events ? (
          events.length < 6 ? (
            <TableContainer>
              <Table
                sx={{ minWidth: 700, mt: 4 }}
                aria-label="customized table"
              >
                <TableHeadRow tabIndexValue={value} type="event" />
                <TableBody>
                  {events &&
                    events.map((f, i) => {
                      return <Event key={f.id} event={f} index={i} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableSlide
              tabIndexValue={value}
              events={events}
              slideData={slideDataValues}
            />
          )
        ) : (
          <Box mt={4}>
            <Grid container justifyContent="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {eventsDemain ? (
          eventsDemain.length < 5 ? (
            <TableContainer>
              <Table
                sx={{ minWidth: 700, mt: 4 }}
                aria-label="customized table"
              >
                <TableHeadRow
                  tabIndexValue={value}
                  width={width}
                  type="event"
                />
                <TableBody>
                  {eventsDemain &&
                    eventsDemain.map((f, i) => {
                      return <Event key={f.id} event={f} index={i} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableSlide
              tabIndexValue={value}
              events={eventsDemain}
              slideData={slideDataValues}
            />
          )
        ) : (
          <Box mt={4}>
            <Grid container justifyContent="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          </Box>
        )}{" "}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box mt={3} pb={4}>
          <Taches afaire={afaire} />
        </Box>
      </TabPanel>
      <Header message={message} />
    </Container>
  );
}
