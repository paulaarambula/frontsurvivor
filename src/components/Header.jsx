import React from "react";
import Line from "../components/Line";

const Header = ({title}) => {
  return (
    <>
    <div className="flex felx-row text-3xl text-gray-100 pl-8 divide-y divide-gray-75">
      <div className="">
        <span>{title}</span>
      </div>
    </div>
    <Line/>
    </>
  );
};

export default Header;
