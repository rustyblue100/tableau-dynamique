import { Box, Divider, List, ListItem, ListItemText } from "@mui/material/";
import Typography from "@mui/material/Typography";
import "dayjs/locale/fr";
import { styled } from "@mui/material/styles";

const Item = styled(ListItemText)(({ theme }) => ({
  ".MuiListItemText-primary": {
    fontSize: 10,
    lineHeight: 1.4,
    [theme.breakpoints.up("lg")]: {
      fontSize: 18,
    },
  },
}));

const Event = ({ event }) => {
  const {
    Nom,
    ["Nb. de personnes"]: nbPers,
    Notes,
    ["Nb. de personnes"]: Nb_de_personnes,
    Status,
    Type,
  } = event.fields;

  return (
    <>
      <List pb={3}>
        <Item
          sx={{ textTransform: "capitalize", mt: "-1px" }}
          primary={Nom}
          primaryTypographyProps={{
            fontWeight: 700,
          }}
        />
        <Item primary={nbPers + " pers."} />
        <Item primary={Type} />
      </List>
      <Divider
        sx={{
          "&.MuiDivider-root": {
            border: `1px solid white`,
          },
        }}
      />
    </>
  );
};

export default Event;
