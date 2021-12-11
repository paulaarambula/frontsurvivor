import React from "react";
import { useUser } from "../context/user";

const PrivateRoute = ({ rolesList, children }) => {
  const { userData } = useUser();
  if (rolesList.includes(userData.rol)) {
    return children
  }
  return (

      <div>
          No estás autorizado para ingresar a esta página...
      </div>
   
  );
};

export default PrivateRoute;