import React from "react";
import { arrowDownIcon, searchIcon} from "../utils/icons";

const FilterAndSearch = ({setViewPopUpFilter, viewPopUpFilter, setValueFilterListProject, valueFilterListProject}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="relative flex flex-row ">
        <div
          onClick={() => {
            setViewPopUpFilter(!viewPopUpFilter);
          }}
          className="flex flex-row border justify-center items-center text-xs rounded-xl mx-0.5 py-1 px-4 border-gray-400 hover:bg-tic-100 hover:border-tic-50 hover:text-white"
        >
          <span> Filtrar por: {valueFilterListProject} </span>
          <span className="pl-2">{arrowDownIcon()}</span>
        </div>
        {!viewPopUpFilter ? (
          <></>
        ) : (
          <CardPopUp
            setValue={setValueFilterListProject}
            setViewPopUpFilter={setViewPopUpFilter}
          />
        )}

        <div className="flex flex-row border justify-between items-center text-xs rounded-xl mx-0.5 px-4 border-gray-400 ">
          <input
            type="text"
            placeholder="Búsqueda"
            className="py-1 bg-transparent focus:outline-none"
          />
          <button className="pl-2">{searchIcon("14", "1")}</button>
        </div>
      </div>
      <div className="flex flex-row text-xs justify-center items-center">
        <span>0-10 de 20</span>
        <div className="flex flex-row justify-center items-center rounded-lg border border-gray-200 hover:bg-tic-100 hover:text-white px-2 mx-0.5">
          <span>8</span>
          <span className="mx-0.5">{arrowDownIcon()}</span>
        </div>
      </div>
    </div>
  );
};

const CardPopUp = ({ setValue}) => {
    return (
      <div className="flex flex-col bg-white w-40 z-50 absolute left-0 top-7 rounded-lg border border-gray-75 pt-2 pb-2 text-xs">
        <li
          onClick={() => {
            setValue("Activo");
          }}
          className="flex hover:bg-tic-75 hover:text-white items-center h-6 py-4 pl-3"
        >
          <span>Activo</span>
        </li>
        <li
          onClick={() => {
            setValue("Inactivo");
          }}
          className="flex hover:bg-gray-100 hover:bg-tic-75 hover:text-white items-center h-6 py-4 pl-3"
        >
          <span>Inactivo</span>
        </li>
      </div>
    );
  };

export default FilterAndSearch;
