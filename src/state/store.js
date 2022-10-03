//CREACION DEL STORE.
import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import movieReducer from "./selectedFilm";
import peliBuscadaReducer from "./peliBuscada";
import userReducer from "./user";
import favoritesReducer from "./favoritos";
import resultReducer from "./resultBusqueda";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    movie: movieReducer,
    peliBuscada: peliBuscadaReducer,
    user: userReducer,
    favorites: favoritesReducer,
    resultadoBusqueda: resultReducer,
  },
});

export default store;
