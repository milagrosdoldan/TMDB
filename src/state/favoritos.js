import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorites = createAction("SET_FAVORITES");

const favoritesReducer = createReducer([], {
  [setFavorites]: (state, action) => action.payload,
});

export default favoritesReducer;
