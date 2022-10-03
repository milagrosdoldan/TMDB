import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const setResult = createAction("SET_RESULTADO");

const resultReducer = createReducer([], {
  [setResult]: (state, action) => action.payload,
});



export default resultReducer;
