import React from "react";
import { Sidevar } from "./Sidevar";

export const Inicio = () => {
  return (
    <>
      <div className="inicio-div">
        <h1 className="inicio-h1">
          Bienvenidos. Millones de películas, programas de televisión y personas
          por descubrir. Explora ahora.
        </h1>

        <Sidevar />
      </div>
      <div className="segundo-div-inicio">
        <h1 className="segundo-h1-inicio">
          Disfruta en tu TV
         
          <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"></img>
        </h1>
        <h3 className="segundo-h2-inicio">
            Ve en smart TV, PlayStation, Xbox, Chromecast, <br></br> Apple TV,
            reproductores de Blu-ray y más.
          </h3>
      </div>
    </>
  );
};
