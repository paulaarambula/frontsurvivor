import React from "react";

const Card = ({ children }) => {
  return (
    <div class="w-full xl:w-23/24 xl:mb-0 mx-auto mt-6 mx-2">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded-lg py-10 text-gray-75 ">
        {children}
      </div>
    </div>
  );
};

export default Card;
