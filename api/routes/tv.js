const axios = require("axios");
const express = require("express");
const tvRouter = express.Router();
const { Tv, User } = require("../models");

//programas de tv populares
tvRouter.get("/", (req, res, next) => {
  axios
    .get(
      "https://api.themoviedb.org/3/tv/popular?api_key=9905a63f7e85c10553c5d0d52bc1bf2b"
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

// traer programas por id
tvRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=9905a63f7e85c10553c5d0d52bc1bf2b`
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

// traer programas por el input de busqueda
tvRouter.get("/search/:nombre", (req, res, next) => {
  const { nombre } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/search/tv?api_key=9905a63f7e85c10553c5d0d52bc1bf2b&query=${nombre}`
    )
    .then((response) => response.data)
    .then((result) => res.send(result))
    .catch(next);
});

// guardar programas en favoritos
tvRouter.post("/favorites", (req, res, next) => {
  const { usuario, tvId, name, poster_path, overview, vote_average } = req.body;
  console.log(req.body);
  User.findOne({ where: { usuario } }).then((user) => {
    Tv.create({
      tvId: tvId,
      name: name,
      poster_path: poster_path,
      overview: overview,
      vote_average: vote_average,
    })
      .then((tv) => {
        tv.setUser(user);
        res.send(tv);
      })
      .catch(next);
  });
});

//eliminar programas de favoritos
tvRouter.delete("/favorites", (req, res, next) => {
  const { tvId, usuario } = req.body;
  User.findOne({
    where: { usuario },
    include: [{ model: Tv, required: true }],
  })
    .then((user) => {
      Tv.findOne({ where: { tvId } }).then((programa) => {
        user.removeTv(programa);
        res.sendStatus(200);
      });
    })
    .catch(next);
});

module.exports = tvRouter;
