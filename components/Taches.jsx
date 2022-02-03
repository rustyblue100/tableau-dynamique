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
import "dayjs/locale/fr";
import dayjs from "dayjs";
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

  dayjs.locale("fr");

  var menu =
    afaireGroup &&
    afaireGroup
      /*       .sort((a, b) => (a > b ? 1 : -1)) */
      .map((t, i) => {
        const formatDate = dayjs(t[0].fields.Date).format("dddd D MMM");
        return formatDate;
      });

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<li class="' + className + '">' + menu[index] + "</li>";
    },
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      padding: "4px 0",
      fontSize: 8,

      [theme.breakpoints.up("lg")]: {
        padding: "20px 0",
        fontSize: 14,
      },
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 8,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.white,
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
                columnSpacing={{ xs: 1, xl: 0 }}
              >
                <Grid item>
                  <Card
                    elevation={0}
                    sx={{
                      minWidth: { sm: 300, lg: 600 },
                      maxWidth: { xs: 500, lg: 400, xl: 3000 },
                    }}
                  >
                    <CardContent>
                      <CardHeader
                        sx={{ p: 0 }}
                        titleTypographyProps={{ fontSize: { xs: 20, lg: 28 } }}
                        title="Plats Frais"
                        subheader={dayjs(t[0].fields.Date).format("dddd D MMM")}
                      />
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="left">
                                Items
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Quantités
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Notes
                              </StyledTableCell>
                            </StyledTableRow>
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
                  <Card
                    elevation={0}
                    sx={{
                      minWidth: { sm: 300, lg: 600 },
                      maxWidth: { xs: 500, lg: 400, xl: 3000 },
                    }}
                  >
                    <CardContent>
                      <CardHeader
                        sx={{ p: 0 }}
                        titleTypographyProps={{ fontSize: { xs: 20, lg: 28 } }}
                        title="Plats Congelés"
                        subheader={dayjs(t[0].fields.Date).format("dddd D MMM")}
                      />
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="left">
                                Items
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Quantités
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Notes
                              </StyledTableCell>
                            </StyledTableRow>
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
