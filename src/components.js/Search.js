import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setPeliBuscada } from "../state/peliBuscada";
import { setResult } from "../state/resultBusqueda";

export const Search = ({}) => {
  const url = useLocation().pathname;
  const dispatch = useDispatch();
  const peliBuscada = useSelector((state) => state.peliBuscada);

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  const handlePeliChange = (e) => {
    dispatch(setPeliBuscada(e.target.value));
  };

  const submit = () => {
    if (url.includes("tv")) {
      axios
        .get(`api/tv/search/${peliBuscada}`)
        .then((result) => result.data)
        .then((data) => {
          dispatch(setResult(data.results));
        });
    } else {
      axios
        .get(`api/movie/search/${peliBuscada}`)
        .then((result) => result.data)
        .then((data) => {
          dispatch(setResult(data.results));
        });
    }
  };

  return (
    <header className="home">
      <form className="formulario-search" onSubmit={handlerSubmit}>
        <input
          type="text"
          autocomplete="off"
          placeholder=" Busca peliculas, programas de television..."
          name="text"
          class="search-buscador"
          onChange={handlePeliChange}
          value={peliBuscada}
        ></input>
        <Link to={`search/${peliBuscada}`}>
          <button onClick={submit} className="button-search">
            Search
          </button>{" "}
        </Link>
      </form>
    </header>
  );
};
