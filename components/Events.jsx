import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Header from "./Header";
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

export default function Events({
  events,
  eventsDemain,
  afaire,
  setTabIndex,
  message,
}) {
  const { width } = useViewport();
  const [value, setValue] = useState(0);

  const slideDataValues = [0, 5, 5, 10]; // Number of row per slide

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
        )}{" "}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box mt={3} pb={4}>
          <Taches afaire={afaire} />
        </Box>
      </TabPanel>
    </Container>
  );
}
