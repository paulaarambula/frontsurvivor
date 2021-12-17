import React from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
// import { Link } from "react-router-dom";

const NavBar = ({
  popupInfoProfile,
  setPopupInfoProfile,
  setMovilResponsiveButton,
  setResponsiveButton,
  movilResponsiveButton,
  responsiveButton,
}) => {
  const searchSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-search"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
  const bellSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-bell"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );
  const settingSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-settings"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );
  const { userData } = useUser();
  return (
    <>
      {/* <div className="flex flex-row justify-between items-center shadow border-gray-100 bg-white absolute w-full h-22 z-20 text-gray-50 text-xs"> */}
      <div className="fixed flex flex-row justify-between items-center bg-white w-full h-22 shadow z-20 text-gray-50 text-xs">
        <div className="flex h-10 pl-10 items-center ">
          {window.screen.width > 639 ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setMovilResponsiveButton(!movilResponsiveButton);
              }}
            >
              {movilResponsiveButton ? (
                <i className="fad fa-angle-double-left hover:text-tic-100"></i>
              ) : (
                <i className="fad fa-angle-double-right hover:text-tic-100"></i>
              )}
            </button>
          )}
          {window.screen.width < 639 ? (
            <></>
          ) : (
            <ButtonResposive
              responsiveButton={responsiveButton}
              setResponsiveButton={setResponsiveButton}
            />
          )}

          <div className="pl-16 text-xs relative hidden sm:flex">
            <input
              type="text"
              placeholder="Búsqueda..."
              className="bg-gray-100 h-10 w-52 rounded-3xl px-5 focus:outline-none placeholder-gray-500"
            ></input>
            <span className="text-sm absolute right-3 top-2 hover:text-tic-100 ">
              {searchSVG}
            </span>
          </div>
        </div>
        <div className="flex h-10 items-center hidden sm:flex w-32">
          <img className="h-15 w-200" src="/logo.png" alt="Workflow logo" />
        </div>
        <div className="flex h-10 items-center text-lg">
          {/* <div className="flex bg-gray-200 w-10 h-6 mr-5 rounded-xl text-white items-center pl-1 hover:text-tic-100">
          <Link to="">
            <i className="fas fa-circle"></i>
          </Link>
        </div> */}
          <div className="mr-3 hover:text-tic-100">{settingSVG}</div>
          <div className="mr-3 hover:text-tic-100">{bellSVG}</div>
          <div className="text-sm mr-2">
            <span>Hi, {userData.name} </span>
          </div>
          <div className="">
            <button
              className="bg-blue-200 rounded-full h-12 w-12 mr-10"
              onMouseEnter={() => {
                setPopupInfoProfile(!popupInfoProfile);
              }}
            ></button>
          </div>
        </div>
        {popupInfoProfile ? <PopupNavbar /> : <></>}
      </div>
    </>
  );
};

const PopupNavbar = () => {
  return (
    <div className="flex flex-col bg-white w-44 absolute right-10 top-20 rounded-lg border border-gray-75 pt-2 pb-2">
      <li className="flex hover:bg-gray-100 items-center h-6 py-4 pl-3">
        <span>Perfil</span>
      </li>
      <div className="h-0.5 bg-gray-100 my-2"></div>
      <Logouth />
    </div>
  );
};

const Logouth = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <div
      onClick={() => {
        deleteToken();
      }}
    >
      {" "}
      <Link to="/auth/login">
        <li className="flex hover:bg-gray-100 items-center h-6 py-4 pl-3">
          <span>Cerrar</span>
        </li>
      </Link>
    </div>
  );
};

const ButtonResposive = ({ responsiveButton, setResponsiveButton }) => {
  return (
    <div>
      {!responsiveButton ? (
        <button onClick={() => setResponsiveButton(true)}>
          <i className="fad fa-angle-double-left hover:text-tic-100"></i>
        </button>
      ) : (
        <button onClick={() => setResponsiveButton(false)}>
          <i className="fad fa-angle-double-right hover:text-tic-100"></i>
        </button>
      )}
    </div>
  );
};
export default NavBar;
