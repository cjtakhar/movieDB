import React from "react";
import Image from "./film.jpg";

const NotFound = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div>
        <img src={Image} alt="Film" style={{ display: "flex", margin: "0 auto" }} />
        <p style={{ textAlign: "center", fontSize: "2rem" }}>Uh Oh. This page does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
