import React from "react";

const Content = ({children}) => {
  return (
    <div className="divide-y divide-black">
      <div className="flex flex-col text-gray-75 ">
      {children}
      </div>
    </div>
  );
};

export default Content;
