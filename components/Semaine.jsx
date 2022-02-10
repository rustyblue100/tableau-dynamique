import { Box, Divider } from "@mui/material/";
import "dayjs/locale/fr";

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
      <Box pb={3}>
        <h3>{Nom}</h3>
        {nbPers} personnes
        <br />
        {Type}
      </Box>
      <Divider
        /*     light={true} */
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
