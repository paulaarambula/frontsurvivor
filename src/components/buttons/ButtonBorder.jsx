import React from "react";

const ButtonBorder = ({ name, set, colorBorder, colorBg, changeValue }) => {
  return (
    <div className={`flex flex-row items-center justify-center border ${colorBorder} rounded-xl h-5 pr-6 pl-1`}>
      <button
        onClick={() => {
        set(changeValue)
        }}
        className={`flex items-center ${colorBg} rounded-xl h-3 text-white text-xxs px-2`}
      >
        {name}
      </button>
    </div>
  );
};

export default ButtonBorder;
