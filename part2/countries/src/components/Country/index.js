import React, { useState, useEffect } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ country, detailed = false }) => {
  const [isDetailed, setIsDetailed] = useState(detailed);

  useEffect(() => {
    setIsDetailed(detailed);
  }, [detailed]);

  if (isDetailed) {
    return <CountryDetails country={country} />;
  }

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setIsDetailed((prev) => !prev)}>show</button>
    </div>
  );
};

export default Country;
