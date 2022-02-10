import { Box, Divider, List, ListItem, ListItemText } from "@mui/material/";
import Typography from "@mui/material/Typography";
import "dayjs/locale/fr";
import { styled } from "@mui/material/styles";

const Item = styled(ListItemText)(({ theme }) => ({
  ".MuiListItemText-primary": {
    fontSize: 10,
    lineHeight: 1.5,
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
      <List mt={2} pb={3} dense={true}>
        <Item
          sx={{ textTransform: "uppercase" }}
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
