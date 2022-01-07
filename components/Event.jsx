import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import ReactMarkdown from "react-markdown";
import Alerts from "./Alerts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#222427",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const DetailslNote = styled("a")(({ theme }) => ({
  /*   border: `1px solid #2e95ec`,
  padding: "2px 6px", */
  fontSize: 32,
  [theme.breakpoints.up("xl")]: {
    fontSize: 54,
  },
  borderRadius: 4,
  color: theme.palette.info.main,
  fontWeight: 400,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Event = (props) => {
  const {
    Name,
    Repas,
    Départ,
    Ready,
    Notes,
    Nb_de_personnes,
    Pains,
    Vans,
    Serveurs,
    Allergies,
    prenom_regisseurs,
    nom_regisseurs,
    tel_regisseur,
    adresse_regisseur,
    Status,
    Détails,
    Adresse,
  } = props.event.fields;

  const index = props.index;
  const formatTime = "HH:mm";
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delayMarquee = (num) => {
    if (num % 2 == 1) {
      return num + 0.8;
    } else {
      return num - 0.8;
    }
  };

  Alerts();

  return (
    <>
      <StyledTableRow
        style={{ backgroundColor: Status === "En attente" && "#fff70038" }}
      >
        <StyledTableCell
          sx={{
            width: 10,
            border: 0,
            backgroundColor:
              Status === "Non-confirmé"
                ? "#f1e577"
                : Status === "Urgent"
                ? "#dda8a8"
                : "#b3dda8",
          }}
          data-priority={Status}
          align="left"
        ></StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-event-${index}`}
          align="left"
        >
          {Name}

          <Typography
            data-priority={Status}
            pt={1}
            variant="regie"
            paragraph="p"
          >
            Régie: {prenom_regisseurs && prenom_regisseurs}{" "}
            {nom_regisseurs && nom_regisseurs} <br />
            Tél:{tel_regisseur && tel_regisseur} <br />
            {Adresse}
          </Typography>
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-pers-${index}`}
          align="center"
        >
          {Nb_de_personnes} pers.
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-pains-${index}`}
          align="center"
        >
          {Pains}
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-vans-${index}`}
          align="center"
        >
          {Vans}
        </StyledTableCell>
        <StyledTableCell
          className={`cell-serveurs-${index}`}
          align="center"
          data-priority={Status}
          sx={{ typography: "body1" }}
        >
          {Serveurs && Serveurs.toString().replace(/,[s]*/g, ", ")}
        </StyledTableCell>

        <StyledTableCell
          data-priority={Status}
          className={`cell-depart-${index}`}
          align="center"
        >
          {moment(Départ).format(formatTime) !== moment().format(formatTime)
            ? moment(Départ).format(formatTime)
            : "à venir..."}
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-ready-${index}`}
          align="center"
        >
          {moment(Ready).format(formatTime) !== moment().format(formatTime)
            ? moment(Ready).format(formatTime)
            : "à venir..."}
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-repas-${index}`}
          align="center"
        >
          {moment(Repas).format(formatTime)}
        </StyledTableCell>

        <StyledTableCell
          data-priority={Status}
          className={`cell-notes-${index}`}
          align="right"
          sx={{ typography: "body1", width: 400 }}
        >
          {Notes}
          <br></br>
          {Détails && (
            <DetailslNote
              href="#"
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleClickOpen}
            >
              +
            </DetailslNote>
          )}
          {Détails && (
            <Dialog onClose={handleClose} open={open}>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <ReactMarkdown>{Détails}</ReactMarkdown>
                </Typography>
              </DialogContent>
            </Dialog>
          )}
        </StyledTableCell>
      </StyledTableRow>
      {/*  {Allergies ? ( */}
      <StyledTableRow>
        <StyledTableCell
          data-priority={Status}
          align="left"
          colSpan={10}
          className={`marquee-wrap-${index}`}
          sx={{ py: 1, typography: "body1" }}
        >
          <Marquee
            speed={80}
            gradient={false}
            pauseOnClick={true}
            delay={delayMarquee(index)}
            data-priority={Status}
          >
            {Allergies ? `↑↑ Allergies: ${Allergies} ↑↑` : "\u00A0"}
          </Marquee>
        </StyledTableCell>
      </StyledTableRow>

      {/* : (
        ""
      )} */}
    </>
  );
};

export default Event;
