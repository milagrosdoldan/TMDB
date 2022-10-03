import React, { useEffect, useState } from "react";
import axios from "axios";
import { Content } from "./commons/Content";
import { Search } from "./components.js/Search";
import { Navbar } from "./components.js/Navbar";
import { Route, Routes } from "react-router-dom";
import { Id } from "./components.js/Id";
import { Sidevar } from "./components.js/Sidevar";
import { CreateUser } from "./components.js/CreateUser";
import { LogIn } from "./components.js/LogIn";
import { Perfil } from "./components.js/Perfil";
import { useDispatch, useSelector } from "react-redux";
import { Inicio } from "./components.js/Inicio";

const App = () => {
  const peliBuscada = useSelector((state) => state.peliBuscada); //PELICULA BUSCADA EN EL INPUT
  const dispatch = useDispatch();
  const [peliculas, setPeliculas] = useState([]); // ARREGLO PELICULAS POPULARES
  const [tv, setTv] = useState([]); // PROGRAMA TV MAS POPULAR
  const selectedFilm = useSelector((state) => state.movie);
  const favorites = useSelector((state) => state.favorites);
  const resultBusqueda = useSelector((state) => state.resultadoBusqueda);
  const user = useSelector((state) => state.user);
  console.log(user);
  console.log(favorites);
  useEffect(() => {
    axios
      .get(`/api/movie`)
      .then((result) => setPeliculas(result.data.results))
      .catch((err) => console.log(err));

    axios
      .get(`/api/tv`)
      .then((result) => setTv(result.data.results))
      .catch((err) => console.log(err));

    axios
      .get(`/api/movie/${selectedFilm.id}`)
      .then((result) => setPeliculas(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Routes></Routes>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
      </Routes>
      <Routes>
        <Route path="movie/*" element={<Sidevar />}></Route>
        <Route path="tv/*" element={<Sidevar />}></Route>
        <Route path="profile*" element={<Sidevar />}></Route>
      </Routes>
      <Routes>
        <Route path="/register" element={<CreateUser />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/profile" element={<Perfil />}></Route>
      </Routes>

      <Routes>
        <Route path="movie" element={<Search />}></Route>

        <Route path="tv" element={<Search />}></Route>
      </Routes>

      <Routes>
        <Route path="tv" element={<Content props={tv} />}></Route>
      </Routes>
      <Routes>
        <Route path="movie" element={<Content props={peliculas} />}></Route>
      </Routes>
      <Routes>
        <Route path="favorites" element={<Content props={favorites} />}></Route>
      </Routes>
      <Routes>
        <Route
          path={`movie/search/${peliBuscada}`}
          element={<Content props={resultBusqueda} />}
        ></Route>
        <Route
          path={`tv/search/${peliBuscada}`}
          element={<Content props={resultBusqueda} />}
        ></Route>
      </Routes>

      <Routes>
        <Route
          path={`:url/id/${selectedFilm.id}/*`}
          element={<Id film={selectedFilm} />}
        ></Route>
        <Route
          path={`tv/id/${selectedFilm.id}/*`}
          element={<Id film={selectedFilm} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
