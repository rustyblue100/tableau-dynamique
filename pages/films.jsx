import Airtable from "airtable";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Events from "../components/Events";
import { usePageVisibility } from "react-page-visibility";
import { useNavigatorOnLine } from "../utils/useOnlineStatus";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Head from "next/head";

const Films = () => {
  const [films, setFilms] = useState();
  const [filmsDemain, setFilmsDemain] = useState();
  const [semaine, setSemaine] = useState();
  const [afaire, setAfaire] = useState();
  const [message, setMessage] = useState();
  const [reload, setReload] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [pusherStatus, setPusherStatus] = useState(false);
  const [pusherConnextionStatus, setPusherConnextionStatus] = useState("");

  const isVisible = usePageVisibility();
  const isOnline = useNavigatorOnLine();

  dayjs.locale("fr");

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHERKEY, {
      cluster: "us2",
    });

    setPusherConnextionStatus(pusher.connection.state);

    const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHERSUBSCRIBE);
    channel.bind(process.env.NEXT_PUBLIC_PUSHEREVENT, function (data) {
      setPusherStatus(data.message);
    });
  }, []);

  function fetchAirtableData() {
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_APIKEY }).base(
      process.env.NEXT_PUBLIC_BASE
    );

    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey: process.env.NEXT_PUBLIC_APIKEY,
    });

    base("Calendrier")
      .select({ /* maxRecords: 10,  */ view: "mapping_de_nuit" })
      .all()
      .then((records) => {
        setFilms(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("Calendrier")
      .select({ /* maxRecords: 10,  */ view: "Demain" })
      .all()
      .then((records) => {
        setFilmsDemain(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("Calendrier")
      .select({ /* maxRecords: 10,  */ view: "Semaine" })
      .all()
      .then((records) => {
        setSemaine(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("?? Faire")
      .select({
        /* maxRecords: 10,  */
        view: "Tableau",
      })
      .all()
      .then((records) => {
        setAfaire(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("Message g??n??ral")
      .select({
        /* maxRecords: 10,  */
        /* view: "Demain" */
      })
      .all()
      .then((message) => {
        setMessage(message);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });
  }

  //First page load fetch && refetch when offline
  useEffect(() => {
    if (isVisible && pusherConnextionStatus) {
      return fetchAirtableData();
    }
    if (isOnline) {
      return fetchAirtableData();
    }

    if (reload) {
      return fetchAirtableData();
    }
  }, [isVisible, pusherConnextionStatus, isOnline, reload]);

  //Fetch triggered by Pusher.js
  useEffect(() => {
    if (pusherStatus === true) {
      fetchAirtableData();
      setPusherStatus(false);
    }
  }, [pusherStatus]);

  useEffect(() => {
    reload && message && message[0].fields.RELOAD && location.reload();
    setReload(true);
  }, [message, reload]);

  function filmsModTimezoneAuj() {
    return (
      films &&
      films.filter((d) => {
        dayjs.extend(isBetween);
        dayjs.extend(customParseFormat);
        const format = "YYYY-MM-DD HH:mm:ss";
        const data = dayjs(d.fields["Date et Heure"])
          .add(1, "seconds")
          .format(format);
        const yesterday = dayjs().subtract(1, "days").format("YYYY-MM-DD");
        const nightStart = `${yesterday} 00:00`;
        const nightEnd = `${yesterday} 05:00`;

        return dayjs(dayjs().format(format)).isBetween(
          `${dayjs().format("YYYY-MM-DD")} 00:00`,
          `${dayjs().format("YYYY-MM-DD")} 05:00`
        )
          ? dayjs(data).isBetween(nightStart, nightEnd)
          : dayjs(d.fields["Date et Heure"]).format("YYYY-MM-DD") ===
              dayjs().format("YYYY-MM-DD");
      })
    );
  }

  function filmsModTimezoneDemain() {
    dayjs.extend(isBetween);
    dayjs.extend(customParseFormat);
    const format = "YYYY-MM-DD HH:mm:ss";
    return dayjs(dayjs().format(format)).isBetween(
      `${dayjs().format("YYYY-MM-DD")} 00:00`,
      `${dayjs().format("YYYY-MM-DD")} 05:00`
    ) && films
      ? films.filter((d) => {
          const newtoday = dayjs().format("DD");
          const nightStart = `${newtoday}`;

          console.log(nightStart);

          return (
            dayjs(d.fields["Date et Heure"]).add(1, "seconds").format("DD") ===
            nightStart
          );
        })
      : filmsDemain;
  }

  return (
    <div>
      <Head>
        <title>Tableau | De Bons Petits Plats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Events
        events={filmsModTimezoneAuj()}
        message={message}
        eventsDemain={filmsModTimezoneDemain()}
        eventsSemaine={semaine}
        afaire={afaire}
        setTabIndex={setTabIndex}
      />
    </div>
  );
};

export default Films;
