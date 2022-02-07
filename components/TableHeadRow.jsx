import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const StyledTableCell = styled(TableCell)(({ theme, tabIndex, type }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: "4px 8px 4px 8px",

    backgroundColor:
      tabIndex === 0
        ? theme.palette.common.black
        : tabIndex === 1
        ? "#e7ae2d"
        : tabIndex === 2
        ? typeMod(type)
        : "",

    borderLeft: `1px solid ${
      tabIndex === 0
        ? theme.palette.common.black
        : tabIndex === 1
        ? "#e7ae2d"
        : tabIndex === 2
        ? typeMod(type)
        : ""
    }`,

    borderBottom: `1px solid ${
      tabIndex === 0
        ? theme.palette.common.black
        : tabIndex === 1
        ? "#e7ae2d"
        : tabIndex === 2
        ? typeMod(type)
        : ""
    }`,

    borderRight: `1px solid ${
      tabIndex === 0
        ? theme.palette.common.black
        : tabIndex === 1
        ? "#e7ae2d"
        : tabIndex === 2
        ? typeMod(type)
        : ""
    }`,
    color:
      tabIndex === 0 ? theme.palette.common.white : theme.palette.common.black,
    fontSize: 14,
    lineHeight: 1,
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
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
        {/*         <StyledTableCell
          sx={{
            width: 15,
          }}
          tabIndex={tabIndexValue}
          type="event"
          align="center"
        ></StyledTableCell> */}
        <StyledTableCell tabIndex={tabIndexValue} type="event">
          Films
        </StyledTableCell>
        <StyledTableCell
          tabIndex={tabIndexValue}
          type="event"
          align="center"
          style={{ whiteSpace: "nowrap" }}
        >
          Nb. de pers.
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Pain
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Van
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Service
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Départ
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Ready
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="center">
          Lunch
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="event" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  ) : type === "pf" ? (
    <TableHead type="pf">
      <TableRow>
        <StyledTableCell tabIndex={tabIndexValue} type="pf">
          Plats Frais
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="pf" align="center">
          Quantités
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="pf" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  ) : (
    <TableHead type="pc">
      <TableRow>
        <StyledTableCell tabIndex={tabIndexValue} type="pc">
          Plats Congelés
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="pc" align="center">
          Quantités
        </StyledTableCell>
        <StyledTableCell tabIndex={tabIndexValue} type="pc" align="right">
          Notes
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadRow;
