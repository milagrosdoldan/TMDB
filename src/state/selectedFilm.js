// peliculas + populares y resultado de busqueda
import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedFilm = createAction("SET_SELECTEDMOVIE");

const movieReducer = createReducer(
  {},
  {
    [setSelectedFilm]: (state, action) => action.payload,
  }
);

export default movieReducer;
