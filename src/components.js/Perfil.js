import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFavorites } from "../state/favoritos";

export const Perfil = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    axios.get(`/api/user/${user.usuario}`).then((result) => {
      const fav = result.data[0].movies.concat(result.data[0].tvs);
      dispatch(setFavorites(fav));
    });
  }, []);

  return (
    <div className="div-perfil">
      <img
        className="imagen-perfil"
        src="https://cdn.iconscout.com/icon/free/png-256/the-movie-database-3551074-2970659.png"
        alt="tmdb"
      ></img>
      <h1 className="">{`Hola @${user.usuario}!`}</h1>
      <h2 className="h2-div-perfil">Miembro desde agosto 2022</h2>
      <Link to="/favorites">
        <button className="button-search">Favoritos</button>
      </Link>
    </div>
  );
};
