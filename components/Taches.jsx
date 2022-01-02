import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import Alerts from "./Alerts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /*   paddingTop: 10,
  paddingBottom: 10, */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: theme.typography.body1,
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AFaire = (props) => {
  const { Notes, Status, Détails, Items, Quantités, Type } =
    props.afaire.fields;

  const index = props.afaire.index;

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*   Alerts(); */

  return (
    <>
      <StyledTableRow>
        <StyledTableCell
          data-priority={Status}
          className={`cell-items-${index}`}
          align="left"
        >
          {Items}
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-qte-${index}`}
          align="center"
        >
          {Quantités}
        </StyledTableCell>
        <StyledTableCell
          data-priority={Status}
          className={`cell-noteTaches-${index}`}
          align="right"
          sx={{ py: 0 }}
        >
          <Typography
            variant="body1"
            data-priority={Status}
            gutterBottom={false}
          >
            <ReactMarkdown>{Notes}</ReactMarkdown>
            {/*     <br />
            <br /> */}

            {/*             {Détails && (
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
            )} */}
          </Typography>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default AFaire;
