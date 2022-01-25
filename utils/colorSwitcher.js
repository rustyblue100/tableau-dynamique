export default function colorSwitch(status) {
  switch (true) {
    case status === "Non-confirmé":
      return "#ffffff";
    case status === "Confirmé":
      return "#23CB59";
    case status === "Urgent":
      return "#F56E00";

    default:
      return "";
  }
}
