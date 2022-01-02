import Airtable from "airtable";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Events from "../components/Events";

const FetchAirtable = () => {
  const [films, setFilms] = useState();
  const [filmsDemain, setFilmsDemain] = useState();
  const [afaire, setAfaire] = useState();
  const [message, setMessage] = useState();
  const [networkStatus, setNetworkStatus] = useState(true);
  const [reload, setReload] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const [pusherStatus, setPusherStatus] = useState(false);
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("a80b1c861fc507af1d63", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("dbpp-board");
    channel.bind("airtable-push", function (data) {
      console.log(data);
      setPusherStatus(data.message);
    });
  }, []);

  // Débit de fetching en fonction de la période d'activité de la journée

  useEffect(() => {
    function fetchAirtableData() {
      const base = new Airtable({ apiKey: process.env.apiKey }).base(
        process.env.base
      );

      Airtable.configure({
        endpointUrl: "https://api.airtable.com",
        apiKey: process.env.apiKey,
      });

      base("Films")
        .select({ /* maxRecords: 10,  */ view: "Aujourd'hui" })
        .all()
        .then((records) => {
          setFilms(records);
          setNetworkStatus(true);
        })
        .catch((err) => {
          // Handle error.
          console.log("error: " + err);
          setNetworkStatus(false);
        });

      base("Films")
        .select({ /* maxRecords: 10,  */ view: "Demain" })
        .all()
        .then((records) => {
          setFilmsDemain(records);
          setNetworkStatus(true);
        })
        .catch((err) => {
          // Handle error.
          console.log("error: " + err);
          setNetworkStatus(false);
        });

      base("Tâches")
        .select({
          /* maxRecords: 10,  */
          view: "Tableau",
        })
        .all()
        .then((records) => {
          setAfaire(records);
          setNetworkStatus(true);
        })
        .catch((err) => {
          // Handle error.
          console.log("error: " + err);
          setNetworkStatus(false);
        });

      base("Message général")
        .select({
          /* maxRecords: 10,  */
          /* view: "Demain" */
        })
        .all()
        .then((message) => {
          setMessage(message);
          setNetworkStatus(true);
        })
        .catch((err) => {
          // Handle error.
          console.log("error: " + err);
          setNetworkStatus(false);
        });
    }

    fetchAirtableData();
  }, [pusherStatus]);

  return {
    films,
    filmsDemain,
    networkStatus,
    afaire,
    message,
    reload,
    tabIndex,
    setReload,
    setTabIndex,
    pusherStatus,
    setPusherStatus,
  };
};

export default FetchAirtable;
