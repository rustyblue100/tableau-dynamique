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
import dayjs from "dayjs";
import "dayjs/locale/fr";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import TacheCard from "./TacheCard";

// import Swiper core and required modules

const AFaire = ({ afaire }) => {
  const group = afaire
    .filter((f) => f && f.fields && f.fields.Publier === true)
    .reduce((r, a) => {
      r[a.fields.Date] = [...(r[a.fields.Date] || []), a];
      return r;
    }, {});

  const afaireGroup = afaire && Object.entries(group);

  let AFaireGroupSorted = [...afaireGroup]
    .map((d) => d.splice(1, 2).shift())
    .sort((a, b) =>
      a.map((d) => d.fields.Date) > b.map((d) => d.fields.Date) ? 1 : -1
    );

  dayjs.locale("fr");

  var menu =
    AFaireGroupSorted &&
    AFaireGroupSorted.map((t) => {
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
      {AFaireGroupSorted &&
        AFaireGroupSorted.map((t, i) => {
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
                      minWidth: { sm: 400, lg: 600 },
                      maxWidth: { xs: 500, lg: 400, xl: 3000 },
                    }}
                  >
                    <CardContent>
                      <CardHeader
                        sx={{ p: 1, backgroundColor: "#7be17691" }}
                        titleTypographyProps={{
                          fontSize: { xs: 16, lg: 22 },
                        }}
                        title="Plats Frais"
                        subheader={dayjs(t[0].fields.Date).format("dddd D MMM")}
                        subheaderTypographyProps={{
                          fontSize: { xs: 12, lg: 16 },
                        }}
                      />
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="left">
                                Items
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Quantit??s
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
                                  data.fields.Type &&
                                  data.fields.Type.toString() ===
                                    "Plats Frais" &&
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
                      minWidth: { sm: 400, lg: 600 },
                      maxWidth: { xs: 500, lg: 400, xl: 3000 },
                    }}
                  >
                    <CardContent>
                      <CardHeader
                        sx={{ p: 1, backgroundColor: "#71c9ff7a" }}
                        titleTypographyProps={{
                          fontSize: { xs: 16, lg: 22 },
                        }}
                        subheaderTypographyProps={{
                          fontSize: { xs: 12, lg: 16 },
                        }}
                        title="Plats Congel??s"
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
                                Quantit??s
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
                                  data.fields.Type &&
                                  data.fields.Type.toString() ===
                                    "Plats Congel??s" &&
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
