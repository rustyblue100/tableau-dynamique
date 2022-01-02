import Airtable from "airtable";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Events from "../components/Events";
import { usePageVisibility } from "react-page-visibility";
import { useNavigatorOnLine } from "../utils/useOnlineStatus";

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
      .select({ /* maxRecords: 10,  */ view: "Aujourd'hui" })
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

    base("Tâches")
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
  }, [isVisible, pusherConnextionStatus, isOnline]);

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

  return (
    <div>
      <Events
        events={films}
        message={message}
        eventsDemain={filmsDemain}
        afaire={afaire}
        setTabIndex={setTabIndex}
      />
    </div>
  );
};

export default Films;