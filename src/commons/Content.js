import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSelectedFilm } from "../state/selectedFilm";

export const Content = ({ props }) => {
  const url = useLocation().pathname.slice(1);
  const img_api = "https://image.tmdb.org/t/p/w500/";
  const dispatch = useDispatch();
  const peliBuscada = useSelector((state) => state.peliBuscada);

  const setVoteClass = (vote) => {
    if (vote >= 8) return "green";
    else if (vote >= 6) return "orange";
    else return "red";
  };

  const handleId = (e) => {
    dispatch(setSelectedFilm(e));
  };

  return (
    <div className="h1-contenido">
      {url.includes("tv") ? (
        <h1 className="h1-content">Programas de Television:</h1>
      ) : (
        <h1 className="h1-content">Peliculas:</h1>
      )}
      <div className="movie-container">
        {props.map((e) => {
          return (
            <div className="movie">
              <Link to={`/${url}/id/${e.id}`}>
                <a
                  onClick={() => {
                    handleId(e);
                  }}
                >
                  <img
                    key={e.id}
                    src={
                      e.poster_path
                        ? img_api + e.poster_path
                        : "https://images.unsplash.com/photo-1615986201152-7686a4867f30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
                    }
                    alt={e.title}
                  ></img>{" "}
                </a>{" "}
              </Link>
              <div className="movie-info">
                <h3>{e.title || e.name}</h3>
                <span className={`tag ${setVoteClass(e.vote_average)}`}>
                  {e.vote_average}
                </span>
              </div>
              <div className="movie-over">
                <h2>Overview</h2>
                <p>{e.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
