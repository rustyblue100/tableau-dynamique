export default function colorSwitch(status, type) {
  switch (true) {
    case status === "Réservation" ||
      (status === "Approuvé" && type === "semaine"):
      return "transparent";
    case status === "Réservation" ||
      (status === "Approuvé" && type !== "semaine"):
      return "#ffffff";
    case status === "Confirmé":
      return "#23CB59";
    case status === "Urgent":
      return "#F56E00";

    default:
      return "";
  }
}
