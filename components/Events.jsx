import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Header from "../components/Header";
import { useViewport } from "../utils/hooks";
import Event from "./Event";
import TableHeadRow from "./TableHeadRow";
import TableSlide from "./TableSlide";
import Taches from "./Taches";

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

  const slideDataValues = width > 3200 ? [0, 5, 5, 10] : [0, 3, 3, 10]; // Number of row per slide

  return (
    <Box sx={{ width: "100%" }}>
      <Header message={message} />

      <Tabs
        variant="fullWidth"
        orientation="horizontal"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Aujourd'hui" {...a11yProps(0)} />
        <Tab label="Demain" {...a11yProps(1)} />
        <Tab label="À faire" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {events ? (
          events && events.length < 5 /* || width < 3600 */ ? (
            <TableContainer>
              <Table
                sx={{ minWidth: 700, mt: 3 }}
                aria-label="customized table"
              >
                <TableHeadRow tabIndexValue={value} type="event" />
                <TableBody>
                  {events &&
                    events.map((f, i) => {
                      return (
                        f.fields.Liveboard &&
                        f.fields.Status && (
                          <Event key={f.id} event={f} index={i} />
                        )
                      );
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
          eventsDemain && eventsDemain.length < 5 /* || width < 3200 */ ? (
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
                      return (
                        f.fields.Liveboard &&
                        f.fields.Status && (
                          <Event key={f.id} event={f} index={i} />
                        )
                      );
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
        <TableContainer>
          <Table sx={{ minWidth: 700, mt: 4 }} aria-label="customized table">
            <TableHeadRow tabIndexValue={value} width={width} type="pf" />
            <TableBody>
              {afaire &&
                afaire
                  .filter((f) => f.fields.Type === "Plats Frais")
                  .map((f, i) => {
                    return (
                      f.fields.Publier && (
                        <Taches key={f.id} afaire={f} index={i} />
                      )
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table aria-label="customized table">
            <TableHeadRow tabIndexValue={value} width={width} type="pc" />
            <TableBody>
              {afaire &&
                afaire
                  .filter((f) => f.fields.Type === "Plats Congelés")
                  .map((f, i) => {
                    return (
                      f.fields.Publier && (
                        <Taches key={f.id} afaire={f} index={i} />
                      )
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
}
