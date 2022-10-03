import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../state/user";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handlerLogOut = () => {
    axios.post("/api/user/logout");
    dispatch(setUser({}));
    navigate("movie");
  };

  return (
    <div className="topnav">
      {/* <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2Ettg6RmM4nQoVjFdZLSCtwyg5ggByDpjw3knP9sQisBPaDKp7zkRWzUKNUL4id9-0I&usqp=CAU"
        alt="tmdb"
      ></img> */}
      <img src="https://cdn.iconscout.com/icon/free/png-256/the-movie-database-3551074-2970659.png"></img>
      <h2>The Movie Data Base</h2>
      <Link to="/">
        <strong className="inicio-navbar">Inicio</strong>
      </Link>
      {user.email ? (
        <>
          <Link to="profile">
            <strong className="">{`${user.nombre.slice(0, 1)}`}</strong>
          </Link>
          <Link to="">
            <strong className="" onClick={handlerLogOut}>
              Log Out
            </strong>
          </Link>
        </>
      ) : (
        <>
          <Link to="login">
            <strong className="">Log IN</strong>{" "}
          </Link>
          <Link to="register">
            <strong className="">Register</strong>{" "}
          </Link>
        </>
      )}
    </div>
  );
};
