const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User, Tv, Movie } = require("../models");

// peliculas populares
router.get("/", (req, res, next) => {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=9905a63f7e85c10553c5d0d52bc1bf2b"
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

// obtener peliculas por id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9905a63f7e85c10553c5d0d52bc1bf2b`
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

// obtener peliculas por el input de busqueda
router.get("/search/:nombre", (req, res, next) => {
  const { nombre } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=9905a63f7e85c10553c5d0d52bc1bf2b&query=${nombre}`
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

//guardar favoritos de peliculas en la base de datos
router.post("/favorites", (req, res, next) => {
  const { usuario, movieId, title, poster_path, overview, vote_average } =
    req.body;
  console.log(req.body);
  User.findOne({ where: { usuario } }).then((user) => {
    Movie.create({
      peliculaId: movieId,
      title: title,
      poster_path: poster_path,
      overview: overview,
      vote_average: vote_average,
    })
      .then((movie) => {
        movie.setUser(user);
        res.send(movie);
      })
      .catch(next);
  });
});

// eliminar favoritos
router.delete("/favorites", (req, res, next) => {
  const { peliculaId, usuario } = req.body;
  User.findOne({
    where: { usuario },
    include: [{ model: Movie, required: true }],
  })
    .then((user) => {
      Movie.findOne({ where: { peliculaId } }).then((movie) => {
        user.removeMovie(movie);
        res.sendStatus(200);
      });
    })
    .catch(next);
});

module.exports = router;
