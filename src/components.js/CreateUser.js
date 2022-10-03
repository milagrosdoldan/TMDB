import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useInput from "../hook/useInput";

export const CreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const nombre = useInput();
  const apellido = useInput();
  const usuario = useInput();
  const email = useInput();
  const contraseña = useInput();

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", {
        nombre: nombre.value,
        apellido: apellido.value,
        usuario: usuario.value,
        email: email.value,
        contraseña: contraseña.value,
      })
      .catch(() => setError(true));
    if (error === false) navigate("/login");
  };

  return (
    <div>
      <div className="container-login-register">
        <h1 className="h1-login-container"> Crea una cuenta </h1>
        <h3 className="h3-login-container">
          Crear una cuenta es fácil y gratis. Rellena el formulario para
          empezar.
        </h3>
      </div>
      <form className="form-register-login" onSubmit={handlerSubmit}>
        <input
          className="loging-register-input"
          type="text"
          placeholder="Nombre"
          {...nombre}
        ></input>
        <input
          className="loging-register-input"
          type="text"
          placeholder="Apellido"
          {...apellido}
        ></input>
        <input
          className="loging-register-input"
          type="text"
          placeholder="Usuario"
          {...usuario}
        ></input>
        <input
          className="loging-register-input"
          type="text"
          placeholder="Email"
          {...email}
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
