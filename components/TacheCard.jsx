import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  const { Items, Quantités, Notes, Type } = info;

  return (
    <StyledTableRow>
      <StyledTableCell align="left">{Items}</StyledTableCell>
      <StyledTableCell align="right">{Quantités}</StyledTableCell>
      <StyledTableCell align="right">{Notes}</StyledTableCell>
    </StyledTableRow>
  );
};

export default TacheCard;
