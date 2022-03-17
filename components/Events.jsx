import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useState } from "react";
import { useViewport } from "../utils/hooks";
import Event from "./Event";
import Header from "./Header";
import Semaine from "./Semaine";
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

export default function Events({
  events,
  eventsDemain,
  eventsSemaine,
  afaire,
  setTabIndex,
  message,
}) {
  const { width } = useViewport();
  const [value, setValue] = useState(0);

  const slideDataValues = [0, 5, 5, 10]; // Number of row per slide

  const group =
    eventsSemaine &&
    eventsSemaine.reduce((r, a) => {
      r[dayjs(a.fields["Date et Heure"]).format("MM-DD")] = [
        ...(r[dayjs(a.fields["Date et Heure"]).format("MM-DD")] || []),
        a,
      ];
      return r;
    }, {});

  const semaineGroup = eventsSemaine && Object.values(group);

  return (
    <Container
      sx={{
        width: "100%",
        pt: 1,
        /*   display: "flex",
        flexDirection: "column",
        minHeight: "100vh", */
      }}
      maxWidth="false"
      disableGutters
    >
      <Header
        message={message}
        value={value}
        setValue={setValue}
        setTabIndex={setTabIndex}
      />

      <TabPanel value={value} index={0}>
        {events ? (
          events.length < 30 ? (
            <TableContainer>
              <Table
                sx={{ minWidth: 700, mt: 1 }}
                aria-label="customized table"
              >
                <TableHeadRow tabIndexValue={value} type="event" />
                <TableBody>
                  {events &&
                    events
                      .sort(
                        (a, b) =>
                          parseInt(a ? a.fields.Départ : null) -
                          parseInt(b ? b.fields.Départ : null)
                      )
                      .map((f, i) => {
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
          eventsDemain.length < 30 ? (
            <TableContainer>
              <Table
                sx={{ minWidth: 700, mt: 1 }}
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
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box mt={3} pb={4}>
          <Taches afaire={afaire} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container justifyContent="space-around" mt={2}>
          {semaineGroup &&
            semaineGroup.map((jour, i) => {
              return (
                <Grid
                  key={i}
                  item
                  sx={{
                    borderLeft: "1px solid white",
                    borderRight: "1px solid white",
                    flex: 1,
                    lineHeight: "1.5",
                    padding: 1,
                    backgroundColor: "rgb(244, 244, 244)",
                  }}
                >
                  <Box mt={-2.3}>
                    <Typography
                      sx={{
                        fontSize: { lg: 28 },
                        fontWeight: 400,
                        textTransform: "lowercase",
                      }}
                      variant="h6"
                      gutterBottom={false}
                    >
                      {jour &&
                        dayjs(jour[0].fields["Date et Heure"]).format("ddd D")}
                    </Typography>
                    {jour &&
                      jour.map((d) => (
                        <Semaine key={jour.id} event={d} index={i} />
                      ))}
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </TabPanel>
    </Container>
  );
}
