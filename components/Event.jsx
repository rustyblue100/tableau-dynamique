import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import ReactMarkdown from "react-markdown";
import colorSwitch from "../utils/colorSwitcher";
import Alerts from "./Alerts";

const StyledTableCell = styled(TableCell)(({ theme, status }) => ({
  color: "#222427",
  lineHeight: 1.5,
  padding: "11px 8px",
  [theme.breakpoints.up("lg")]: {
    padding: 11,
  },
  backgroundColor: colorSwitch(status),
  /*   border: `1px solid ${colorSwitch(status)}`, */
  borderBottom: `1px solid ${colorSwitch(status)}`,

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const DetailslNote = styled("a")(({ theme }) => ({
  /*   border: `1px solid #2e95ec`,
  padding: "2px 6px", */
  fontSize: 20,
  [theme.breakpoints.up("lg")]: {
    fontSize: 28,
  },
  borderRadius: 4,
  color: theme.palette.info.main,
  fontWeight: 400,
}));

const StyledTableRow = styled(TableRow)(({ theme, status }) => ({
  backgroundColor: theme.palette.action.hover,
  "&:nth-of-type(odd)": {
    backgroundColor: colorSwitch(status),
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Event = (props) => {
  const {
    Nom,
    ["Date et Heure"]: Date_et_Heure,
    Départ,
    Ready,
    Notes,
    ["Nb. de personnes"]: Nb_de_personnes,
    Pains,
    ["Van (from Vans)"]: Vans,
    Serveurs,
    ["Arrivé service"]: Arrivé_service,
    Allergies,
    prenom_regisseurs,
    ["nom_regisseurs (from Régisseurs)"]: nom_regisseurs,
    tel_regisseur,
    Status,
    ["Détails de commande"]: Détails,
    ["Adresse de l'évènement"]: Adresse_evenement,
    Adresse,
    Type,
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

  /*   Alerts(); */

  function truncate(string, limit) {
    return string.length > limit ? `${string.substr(0, limit)}...` : string;
  }

  return (
    <>
      <Alerts />
      <StyledTableRow
        status={Status}
        style={{ backgroundColor: Status === "En attente" && "#fff70038" }}
      >
        {/*         <StyledTableCell
          status={Status}
          data-priority={Status}
          align="left"
        ></StyledTableCell> */}
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-event-${index}`}
          align="left"
          sx={{
            fontWeight: 500,
            lineHeight: 1.25 /* width: { xs: 186, lg: 340 } */,
          }}
        >
          {truncate(Nom, 14)}

          <Typography
            data-priority={Status}
            pt={1}
            mb={0}
            lineHeight={"15px"}
            variant="regie"
            paragraph="p"
            style={{ whiteSpace: "nowrap" }}
          >
            Régie: {nom_regisseurs && nom_regisseurs} <br />
            Tél: {tel_regisseur && tel_regisseur} <br />
            {Adresse && !Adresse_evenement && truncate(Adresse.toString(), 34)}
            {Adresse_evenement && truncate(Adresse_evenement.toString(), 34)}
          </Typography>
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-type-${index}`}
          align="center"
          style={{ fontWeight: 400 }}
        >
          {Type}
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-pers-${index}`}
          align="center"
          style={{ fontWeight: 700 }}
        >
          {Nb_de_personnes} p.
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-pains-${index}`}
          align="center"
        >
          {Pains}
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-vans-${index}`}
          align="center"
          style={{ whiteSpace: "nowrap" }}
        >
          {Vans && Vans.toString().replace(/,[s]*/g, ", ")}
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          className={`cell-serveurs-${index}`}
          align="center"
          data-priority={Status}
          sx={{ typography: "serveurs" }}
        >
          {Serveurs && Serveurs.toString().replace(/,[s]*/g, ", ")}
          <br />
          <small>Arrivé: {Arrivé_service}</small>
        </StyledTableCell>

        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-depart-${index}`}
          align="center"
          style={{
            fontWeight: Status !== "Approuvé" && 700,
            whiteSpace: "nowrap",
          }}
        >
          {!Départ ? "à venir..." : Départ}
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-ready-${index}`}
          align="center"
          style={{ whiteSpace: "nowrap" }}
        >
          {!Ready ? "à venir..." : Ready}
        </StyledTableCell>
        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-repas-${index}`}
          align="center"
        >
          {dayjs(Date_et_Heure).format(formatTime)}
        </StyledTableCell>

        <StyledTableCell
          status={Status}
          data-priority={Status}
          className={`cell-notes-${index}`}
          align="right"
          sx={{
            whiteSpace: "pre-line",
            fontSize: { xs: 14, lg: 16 },
            lineHeight: 1.3,
            width: { xs: 112, lg: "unset" },
          }}
        >
          {Notes}
          <br></br>
          {Détails?.trim() && (
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
            <Dialog
              onClose={handleClose}
              open={open}
              maxWidth="md"
              sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}
            >
              <DialogContent dividers>
                <Typography variant="regie" gutterBottom>
                  <ReactMarkdown>{Détails}</ReactMarkdown>
                </Typography>
              </DialogContent>
            </Dialog>
          )}
        </StyledTableCell>
      </StyledTableRow>
      {/*  {Allergies ? ( */}
      <StyledTableRow status={Status}>
        <StyledTableCell
          data-priority={Status}
          align="left"
          colSpan={10}
          className={`marquee-wrap-${index}`}
          sx={{ py: "3px", typography: "body1", border: "none" }}
        >
          <Marquee
            style={{ color: "#D0342C", fontWeight: 500, border: "none" }}
            speed={40}
            gradient={false}
            pauseOnClick={true}
            delay={delayMarquee(index)}
            data-priority={Status}
          >
            {Allergies ? `↑  ${Allergies} ↑` : "\u00A0"}
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
