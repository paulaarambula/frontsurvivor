import React from "react";
import { Link } from "react-router-dom";
import PrivateComponent from "./PrivateComponents";
import {
  advanceIcon,
  inscriptionsIcon,
  ProjectIcon,
  userIcon,
  dashboardIcon,
} from "../utils/icons";

const SideBar = ({ setItemsSidebar, movilResponsiveButton, setItem }) => {
  return (
    <div
      className={`${
        movilResponsiveButton ? "" : "hidden"
      } sm:flex flex-col bg-white w-27 h-screen rounded-lg shadow-lg rounded-xl text-gray-50`}
    >
      {/* <div className="flex-1 bg-white shadow-lg border-gray-50 w-27 rounded-xl z-10 sm:flex h-full hidden"> */}
      <div className="overflow-auto">
        <div className="divide-y divide-gray-100 text-5xl w-full">
          <Items
            icon={dashboardIcon()}
            items="Dashboard"
            setItemsSidebar={setItemsSidebar}
            _id="dashboard"
            setItem={setItem}
            path="/"
          />

          <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
            <Items
              icon={userIcon()}
              items="Usuarios"
              setItemsSidebar={setItemsSidebar}
              _id="user"
              setItem={setItem}
              path="/admin/user/index"
            />
          </PrivateComponent>
          <Items
            icon={ProjectIcon()}
            items="Proyectos"
            setItemsSidebar={setItemsSidebar}
            _id="project"
            setItem={setItem}
            path="/admin/project/index"
          />
          <Items
            icon={advanceIcon()}
            items="Avances"
            setItemsSidebar={setItemsSidebar}
            _id="advance"
            setItem={setItem}
            path="/admin/advancement/index"
          />
          <Items
            icon={inscriptionsIcon()}
            items="Inscripciones"
            setItemsSidebar={setItemsSidebar}
            _id="inscription"
            setItem={setItem}
            path="/admin/inscriptions/index"
          />
        </div>
      </div>
    </div>
  );
};

const Items = ({ icon, items, setItemsSidebar, _id, setItem, path }) => {
  const ejct = () => {
    // setItemsSidebar(true);
    setItem(_id);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      {/* mostrar solo si esta activo el modulo */}
      {/* <div className="w-1 h-22 rounded-lg bg-tic-100"></div> */}
      <div className="flex flex-col justify-center items-center h-28 w-full p-2 hover:text-tic-100">
        <button onMouseEnter={() => ejct()}>
          <Link to={path}>{icon}</Link>
        </button>
        <span className="text-xs mt-2">{items}</span>
      </div>
    </div>
  );
};

export default SideBar;
