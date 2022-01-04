import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import moment from "moment";
import "moment/locale/fr"; // without this line it didn't work
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import TacheCard from "./TacheCard";

// import Swiper core and required modules

const AFaire = ({ afaire }) => {
  const group = afaire.reduce((r, a) => {
    r[a.fields.Date] = [...(r[a.fields.Date] || []), a];
    return r;
  }, {});

  const afaireGroup = afaire && Object.values(group);

  var menu =
    afaireGroup &&
    afaireGroup.map((t, i) => {
      const formatDate = moment(t[0].fields.Date).format("dddd D MMM");

      return formatDate;
    });

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<li class="' + className + '">' + menu[index] + "</li>";
    },
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Swiper pagination={pagination}>
      {afaireGroup &&
        afaireGroup.map((t, i) => {
          return (
            <SwiperSlide key={i}>
              <Grid
                container
                justifyContent="center"
                maxWidth="100%"
                columnSpacing={4}
              >
                <Grid item>
                  <Card sx={{ minWidth: 700 }}>
                    <CardContent>
                      <CardHeader
                        title="Plats Frais"
                        subheader={moment(t[0].fields.Date).format(
                          "dddd D MMM"
                        )}
                      />
                      <TableContainer>
                        <Table aria-label="simple table" size="medium">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Items</TableCell>
                              <TableCell align="right">Quantités</TableCell>
                              <TableCell align="right">Notes</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {t
                              .filter(
                                (data) =>
                                  data.fields.Type === "Plats Frais" &&
                                  data.fields.Publier
                              )
                              .map((f, i) => {
                                return <TacheCard key={i} info={f.fields} />;
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item>
                  <Card sx={{ minWidth: 700 }}>
                    <CardContent>
                      <CardHeader
                        title="Plats Congelés"
                        subheader={moment(t[0].fields.Date).format(
                          "dddd D MMM"
                        )}
                      />
                      <TableContainer>
                        <Table aria-label="simple table" size="medium">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Items</TableCell>
                              <TableCell align="right">Quantités</TableCell>
                              <TableCell align="right">Notes</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {t
                              .filter(
                                (data) =>
                                  data.fields.Type === "Plats Congelés" &&
                                  data.fields.Publier
                              )
                              .map((f, i) => {
                                return <TacheCard key={i} info={f.fields} />;
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default AFaire;
