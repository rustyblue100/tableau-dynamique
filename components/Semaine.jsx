import { Divider, List, ListItemText } from "@mui/material/";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import "dayjs/locale/fr";

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
    ["Date et Heure"]: Date_et_Heure,
    ["Nb. de personnes"]: nbPers,
    Type,
  } = event.fields;

  const formatTime = "HH:mm";

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
        <Item
          primary={
            nbPers &&
            nbPers + " pers. " + dayjs(Date_et_Heure).format(formatTime)
          }
        />
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
