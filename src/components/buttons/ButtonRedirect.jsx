import React from "react";
import { Link } from "react-router-dom";

const ButtonRedirect = ({ nameButton, redirect }) => {
  //loading => usar este estado para mostrar icono de espera
  return (
    <>
      <button
        className="text-gray-25 bg-tic-100 px-5 py-2 rounded-3xl font-bold text-sm mt-4 disabled:opacity-50 disabled:bg-gray-700"
      >
        <Link to={redirect}>{nameButton}</Link>
      </button>
    </>
  );
};

export default ButtonRedirect;
