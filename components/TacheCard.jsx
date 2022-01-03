import React from "react";

const TacheCard = ({ info }) => {
  const { Items } = info;

  return <h2>{Items}</h2>;
};

export default TacheCard;
