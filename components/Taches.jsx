import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TacheCard from "./TacheCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules

const AFaire = ({ afaire }) => {
  console.log(afaire);

  console.log(afaire && afaire.map((a) => <h1>1</h1>));

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Swiper pagination={pagination}>
      {afaire &&
        afaire.map((t) => {
          return (
            <SwiperSlide>
              {t.map((f) => (
                <TacheCard info={f.fields} />
              ))}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default AFaire;
