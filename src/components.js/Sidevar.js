import React from "react";
import { Link } from "react-router-dom";

export const Sidevar = () => {
  return (
    <div className="Sidnavar">
      <Link to="/movie">
        <button className="btn">Peliculas</button>
      </Link>
      <Link to="/tv">
        <button className="btn">Programas de Television</button>
      </Link>
    </div>
  );
};
