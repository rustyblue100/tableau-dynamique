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

const Films = () => {
  const [films, setFilms] = useState();
  const [filmsDemain, setFilmsDemain] = useState();
  const [afaire, setAfaire] = useState();
  const [message, setMessage] = useState();
  const [reload, setReload] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [pusherStatus, setPusherStatus] = useState(false);
  const [pusherConnextionStatus, setPusherConnextionStatus] = useState("");

  const isVisible = usePageVisibility();
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

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

    base("Films")
      .select({ /* maxRecords: 10,  */ view: "Testday" })
      .all()
      .then((records) => {
        setFilms(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("Films")
      .select({ /* maxRecords: 10,  */ view: "Demain" })
      .all()
      .then((records) => {
        setFilmsDemain(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });

    base("À Faire")
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

    base("Message général")
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

  function filmsModTimezone() {
    return (
      films &&
      films.filter((d) => {
        dayjs.extend(isBetween);
        dayjs.extend(customParseFormat);
        const format = "YYYY-MM-DD hh:mm";
        const data = dayjs(d.fields.Date_et_Heure).format(format);
        const yesterday = dayjs().subtract(1, "days").format("YYYY-MM-DD");
        const nightStart = `${yesterday} 00:00`;
        const nightEnd = `${yesterday} 05:00`;

        return dayjs(dayjs().format(format)).isBetween(
          `${dayjs().format("YYYY-MM-DD")} 00:00`,
          `${dayjs().format("YYYY-MM-DD")} 05:00`
        )
          ? dayjs(data).isBetween(nightStart, nightEnd)
          : dayjs(d.fields.Date_et_Heure).format("DD") === dayjs().format("DD");
      })
    );
  }

  return (
    <div>
      <Events
        events={filmsModTimezone()}
        message={message}
        eventsDemain={filmsDemain}
        afaire={afaire}
        setTabIndex={setTabIndex}
      />
    </div>
  );
};

export default Films;
