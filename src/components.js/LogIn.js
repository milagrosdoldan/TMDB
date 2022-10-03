import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useInput from "../hook/useInput";
import { setUser } from "../state/user";

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const user = useSelector((state) => state.user);
  const usuario = useInput();
  const contraseña = useInput();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const { data } = await axios.post("/api/user/login", {
        usuario: usuario.value,
        contraseña: contraseña.value,
      });

      dispatch(setUser(data)); // seteo de usuario global
      if (user) return navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div>
      <div className="container-login-register">
        <h1 className="h1-login-container">Accede a tu cuenta </h1>
        <h3 className="h3-login-container">
          {" "}
          Para poder valorar la TMDB, así como para obtener recomendaciones
          personales, deberás acceder con tu cuenta. Si no tienes una,
          registrate para obtenerla. <Link to="/register">Pulsa aquí</Link> para
          empezar.
        </h3>
      </div>
      <form className="form-register-login" onSubmit={handlerSubmit}>
        <input
          className="loging-register-input"
          type="text"
          placeholder="Usuario"
          {...usuario}
        ></input>

        <input
          className="loging-register-input"
          type="password"
          placeholder="Contraseña"
          {...contraseña}
        ></input>
        <button className="sing-up" type="submit">
          Sing Up
        </button>
      </form>

      <div
        className={`mt-6 flex items-center ${
          error ? "justify-between" : "justify-end"
        }`}
      >
        {error && (
          <p>Credenciales invalidas, verifique los datos ingresados.</p>
        )}
      </div>
    </div>
  );
};
