import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function typeMod(type) {
  switch (true) {
    case type === "pc":
      return "#00adff59";
    case type === "pf":
      return "#84d60259";
    default:
      break;
  }
}

const StyledTableCell = styled(TableCell)(({ theme, tabindex, type }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      tabindex === 0
        ? theme.palette.common.black
        : tabindex === 1
        ? "#e7ae2d"
        : tabindex === 2
        ? typeMod(type)
        : "",
    color:
      tabindex === 0 ? theme.palette.common.white : theme.palette.common.black,
    fontSize: 20,
    lineHeight: 1,
    [theme.breakpoints.up("xl")]: {
      fontSize: 48,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 32,
  },
}));

const TableHeadRow = ({ tabIndexValue, type }) => {
  return type === "event" ? (
    <TableHead type="event">
      <TableRow>
        <StyledTableCell tabindex={tabIndexValue} type="event">
          Films
        </StyledTableCell>
        <StyledTableCell
          tabindex={tabIndexValue}
          type="event"
          align="center"
          style={{ whiteSpace: "nowrap" }}
        >
          Nb. de pers.
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Pain
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Van
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Service
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Départ
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Ready
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="center">
          Repas
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="event" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  ) : type === "pf" ? (
    <TableHead type="pf">
      <TableRow>
        <StyledTableCell tabindex={tabIndexValue} type="pf">
          Plats Frais
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="pf" align="center">
          Quantités
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="pf" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  ) : (
    <TableHead type="pc">
      <TableRow>
        <StyledTableCell tabindex={tabIndexValue} type="pc">
          Plats Congelés
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="pc" align="center">
          Quantités
        </StyledTableCell>
        <StyledTableCell tabindex={tabIndexValue} type="pc" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadRow;