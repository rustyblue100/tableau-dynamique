import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TacheCard from "./TacheCard";
import moment from "moment";
import "moment/locale/fr"; // without this line it didn't work

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules

const AFaire = ({ afaire }) => {
  const group = afaire.reduce((r, a) => {
    r[a.fields.Date] = [...(r[a.fields.Date] || []), a];
    return r;
  }, {});

  const afaireGroup = afaire && Object.values(group);

  var menu =
    afaireGroup &&
    afaireGroup.map((t, i) => {
      const formatDate = moment(t[0].fields.Date).format("dddd D MMM");

      return formatDate;
    });

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<li class="' + className + '">' + menu[index] + "</li>";
    },
  };

  return (
    <Swiper pagination={pagination}>
      {afaireGroup &&
        afaireGroup.map((t, i) => {
          return (
            <SwiperSlide key={i}>
              <h1>{moment(t[0].fields.Date).format("dddd D MMM")}</h1>

              {t.map((f, i) => (
                <TacheCard key={i} info={f.fields} />
              ))}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default AFaire;
