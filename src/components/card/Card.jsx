import React from "react";

const Card = ({ children }) => {
  return (
    <div class="w-full mt-6 h-full">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-1 shadow-md rounded-lg py-10 text-gray-75 ">
        {children}
      </div>
    </div>
  );
};

export default Card;
