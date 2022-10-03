import { createAction, createReducer } from "@reduxjs/toolkit";

export const setPeliBuscada = createAction("SET_PELIBUSCADA");

const peliBuscadaReducer = createReducer("", {
  [setPeliBuscada]: (state, action) => action.payload,
});

export default peliBuscadaReducer;
