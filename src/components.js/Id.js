import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";

export const Id = ({ film }) => {
  const img_api = "https://image.tmdb.org/t/p/w500/";
  const user = useSelector((state) => state.user);
  const selectedFilm = useSelector((state) => state.movie);
  const url = useLocation().pathname;

  const handleClick = () => {
    if (url.includes("movie")) {
      axios.post("/api/movie/favorites", {
        usuario: user.usuario,
        movieId: selectedFilm.id,
        title: selectedFilm.title,
        poster_path: selectedFilm.poster_path,
        overview: selectedFilm.overview,
        vote_average: selectedFilm.vote_average,
      });
    } else {
      axios.post("/api/tv/favorites", {
        usuario: user.usuario,
        tvId: selectedFilm.id,
        name: selectedFilm.name,
        poster_path: selectedFilm.poster_path,
        overview: selectedFilm.overview,
        vote_average: selectedFilm.vote_average,
      });
    }
  };

  const handleDelete = () => {
    if (url.includes("movie")) {
      axios.delete(`/api/movie/favorites`, {
        data: { usuario: user.usuario, peliculaId: selectedFilm.id },
      });
    } else {
      axios.delete(`/api/tv/favorites`, {
        data: { usuario: user.usuario, tvId: selectedFilm.id },
      });
    }
  };
  return (
    <>
      {url.includes("favorites") && (
        <Link to="/favorites">
          <button>Atrás</button>
        </Link>
      )}
      <div className="primer-div-id">
        <div>
          <h1 className="h1-id">{film.title || film.name}</h1>
          <p className="primer-p-id ">
            {film.overview ||
              "Cassie y Luke no podrían ser más diferentes. Cassie trabaja en un bar y persigue su sueño de convertirse en cantante. Luke está a punto de embarcarse para el servicio militar. Pero un encuentro casual en el bar de Cassie cambia el curso de sus vidas"}
          </p>
          <p className={"primer-p-id"}>{film.vote_average}</p>
          {url.includes("add") || url.includes("favorites") ? (
            <Link to="">
              <button
                value="submit"
                type="submit"
                className="fav-button"
                onClick={handleDelete}
              >
                Dislike
              </button>
            </Link>
          ) : (
            <Link to="add">
              <button
                value="submit"
                type="submit"
                className="fav-button"
                onClick={handleClick}
              >
                Like
              </button>
            </Link>
          )}
        </div>
        <img
          key={film.id}
          src={img_api + film.poster_path}
          alt={film.title}
        ></img>
      </div>
    </>
  );
};

{
  /* <div align="left" className="segundo-h2-inicio">
{/* <span>{film.vote_average}</span> */
}
{
  /* <h2 className="h2-id">
  {film.overview}
  <img
    key={film.id}
    src={img_api + film.poster_path}
    alt={film.title}
  ></img>{" "}
</h2> */
}
