import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: 6,

  [theme.breakpoints.up("lg")]: {
    padding: 10,
  },
  [`&.${tableCellClasses.head}`]: {
    padding: 2,

    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,

    [theme.breakpoints.up("lg")]: {
      fontSize: 16,
    },
  },
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

const TacheCard = ({ info }) => {
  const { Items, Quantités, Notes, Type, Prêt, Plats } = info;

  return (
    <StyledTableRow>
      <StyledTableCell
        sx={{ textDecoration: Prêt && "line-through" }}
        align="left"
      >
        {Plats}
      </StyledTableCell>
      <StyledTableCell
        sx={{ textDecoration: Prêt && "line-through" }}
        align="right"
      >
        {Quantités}
      </StyledTableCell>
      <StyledTableCell
        style={{
          fontSize: 6,
          maxWidth: 100,
          textDecoration: Prêt && "line-through",
        }}
        align="right"
      >
        {Notes}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TacheCard;
