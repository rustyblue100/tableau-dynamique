export default function colorSwitch(status) {
  switch (true) {
    case status === "Réservation":
      return "#ffffff";
    case status === "Confirmé":
      return "#23CB59";
    case status === "Urgent":
      return "#F56E00";

    default:
      return "";
  }
}
