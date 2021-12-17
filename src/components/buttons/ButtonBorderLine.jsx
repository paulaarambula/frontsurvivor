import React from "react";

const ButtonBorderLine = ({name_, value_}) => {
  return (
    <div className="flex flex-row items-center justify-center border border-tic-25 rounded-xl h-5 pr-6 pl-1">
      <button onClick={()=>value_()} className="flex items-center bg-tic-75 rounded-xl h-3 text-white text-xxs px-2">{name_}</button>
    </div>
  );
};

export default ButtonBorderLine;
