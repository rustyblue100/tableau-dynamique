import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useState } from "react";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Event from "./Event";
import TableHeadRow from "./TableHeadRow";

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const TableSlide = ({ slideData, events, eventsDemain, tabIndexValue }) => {
  const evensData = events || eventsDemain;
  const [swiperRef, setSwiperRef] = useState(null);

  function currentSwipe() {
    return swiperRef && swiperRef.activeIndex + 1;
  }

  return (
    <>
      {/*       <div
        style={{
          float: "right",
          marginTop: "-2rem",
          marginRight: "1rem",
        }}
      >
        {currentSwipe()}/2
      </div> */}
      <Swiper
        effect={"fade"}
        slidesPerView={"auto"}
        spaceBetween={0}
        /*   width={"auto"} */
        autoHeight
        centeredSlides={true}
        centeredSlidesBounds={true}
        enabled={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiperRef}
      >
        <SwiperSlide style={{ backgroundColor: "white" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 700, mt: 0, p: 0 }}
              aria-label="customized table"
              className={"table-page-one"}
            >
              <TableHeadRow tabIndexValue={tabIndexValue} type="event" />
              <TableBody>
                {
                  // Activate or not second page view
                  evensData &&
                    evensData.slice(slideData[0], slideData[1]).map((f, i) => {
                      return (
                        /*    f.fields.Tableau && */
                        /*   f.fields.Status && ( */
                        <Event key={f.id} event={f} index={i} />
                        /*  ) */
                      );
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "white" }}>
          {/*    <span style={{ float: "right", marginRight: "1rem" }}>2/2</span> */}
          <span
            style={{
              position: "absolute",
              top: "-.44rem",
              right: 0,
              zIndex: 9999999999,
            }}
          ></span>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, mt: 0 }}
              aria-label="customized table"
              className={"table-page-two"}
            >
              <TableHeadRow tabIndexValue={tabIndexValue} type="event" />
              <TableBody>
                {
                  // Activate or not second page view

                  evensData &&
                    evensData.slice(slideData[2], slideData[3]).map((f, i) => {
                      return (
                        /*     f.fields.Tableau && */
                        /*     f.fields.Status && ( */
                        <Event key={f.id} event={f} index={i + 5} /> // index value for secongd page
                        /*   ) */
                      );
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default TableSlide;
