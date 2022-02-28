import { Divider, List, ListItemText } from "@mui/material/";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import colorSwitch from "../utils/colorSwitcher";

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
    Allergies,
    Status,
  } = event.fields;

  const formatTime = "HH:mm";

  return (
    <>
      <List pb={3} sx={{ backgroundColor: colorSwitch(Status, "semaine") }}>
        <Item
          sx={{ textTransform: "capitalize", mt: "-1px", ml: 1 }}
          primary={Nom}
          primaryTypographyProps={{
            fontWeight: 700,
          }}
        />
        <Item
          sx={{ ml: 1 }}
          primary={
            nbPers &&
            nbPers + " pers. " + dayjs(Date_et_Heure).format(formatTime)
          }
        />
        <Item primary={Type} sx={{ ml: 1 }} />
        <Item
          sx={{ ml: 1 }}
          primaryTypographyProps={{
            color: "error.main",
          }}
          primary={Allergies && Allergies}
        />
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
