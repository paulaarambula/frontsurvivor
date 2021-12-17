import React from "react";

const SwitchBotton = ({ name, value, setValue }) => {
  return (
    <div className="flex flex-row items-center justify-center border border-tic-25 rounded-xl h-5 pr-6 pl-1">
      {!value ? (
        <button
          onClick={() => {
            setValue(!value);
          }}
          className="flex items-center bg-tic-75 rounded-xl h-3 text-white text-xxs px-2"
        >
          {name}
        </button>
      ) : (
        <button
          onClick={() => {
            setValue(!value);
          }}
          className="flex items-center bg-gray-400 rounded-xl h-3 text-white text-xxs px-2"
        >
          Ocultar
        </button>
      )}
    </div>
  );
};

export default SwitchBotton;
