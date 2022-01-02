import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const WeatherImg = ({ weather }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xl"));

  const desc = weather[0].description;

  const iconSize = matches ? 64 : 100;
  switch (true) {
    case desc === "ciel dégagé":
      return (
        <Image
          src="/sunny.png"
          alt="ciel dégagé"
          width={iconSize}
          height={iconSize}
        />
      );
    case desc === "couvert" || desc === "nuageux":
      return (
        <Image
          src="/cloudy.png"
          alt="nuageux"
          width={iconSize}
          height={iconSize}
        />
      );
    case desc === "légère pluie" || desc === "forte pluie":
      return (
        <Image src="/rain.png" alt="pluie" width={iconSize} height={iconSize} />
      );
    case desc === "partiellement nuageux" || desc === "peu nuageux":
      return (
        <Image
          src="/partial.png"
          alt="rain Logo"
          width={iconSize}
          height={iconSize}
        />
      );
    case desc === "pluie modérée" || desc === "pluie et neige":
      return (
        <Image
          src="/rain.png"
          alt="pluie modérée"
          width={iconSize}
          height={iconSize}
        />
      );
    case desc === "neige" ||
      desc === "légères chutes de neige" ||
      desc === "chutes de neige":
      return (
        <Image
          src="/snow.png"
          alt="snow Logo"
          width={iconSize}
          height={iconSize}
        />
      );
    default:
      return "";
  }
};

export default WeatherImg;
