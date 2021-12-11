import React from "react";
import { Link } from "react-router-dom";
import PrivateComponent from "./PrivateComponents";

const SideBar = ({ setItemsSidebar, movilResponsiveButton, setItem}) => {

  const sx = "32";
  const chats = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-pie-chart"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
  const projects = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-briefcase"
    >
      <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
  const users = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx={9} cy={7} r={4} />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  return (
    <div className={`${movilResponsiveButton ? "" : "hidden"} sm:flex flex-col bg-white w-27 h-screen rounded-lg shadow-lg rounded-xl`}>
      {/* <div className="flex-1 bg-white shadow-lg border-gray-50 w-27 rounded-xl z-10 sm:flex h-full hidden"> */}
      <div className="overflow-scroll">
        <div className="divide-y divide-gray-100 text-5xl w-full">
          <PrivateComponent rolesList={["ADMINISTRADOR"]}>
            <Items
              icon={chats}
              items="Dashboard"
              setItemsSidebar={setItemsSidebar}
              _id="dashboard"
              setItem={setItem}
            />
          </PrivateComponent>
          <Items
            icon={users}
            items="Usuarios"
            setItemsSidebar={setItemsSidebar}
            _id="user"
            setItem={setItem}
          />
          <Items
            icon={projects}
            items="Proyectos"
            setItemsSidebar={setItemsSidebar}
            _id="project"
            setItem={setItem}
          />
        </div>
      </div>
      
    </div>
  );
};

const Items = ({ icon, items, setItemsSidebar, _id, setItem }) => {
  const ejct = () => {
    setItemsSidebar(true);
    setItem(_id);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-1 h-22 rounded-lg bg-tic-100"></div>
      <div className="flex flex-col justify-center items-center h-32 w-full p-2 hover:text-tic-100">
        <button onMouseEnter={() => ejct()}>
          <Link to="/admin/user/index">{icon}</Link>
        </button>
        <span
          className="text-xs mt-2"
        >
          {items}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
