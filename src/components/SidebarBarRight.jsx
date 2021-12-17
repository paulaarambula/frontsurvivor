import React from "react";


const ItemsSidebarRight = {
    user: [
      ["@", "item_user1"],
      ["@", "item_user2"],
      ["@", "item_user3"],
    ],
    project: [
      ["@", "item_project1"],
      ["@", "item_project2"],
      ["@", "item_project3"],
    ],
    dashboard: [
      ["@", "item_dashboard1"],
      ["@", "item_dashboard2"],
      ["@", "item_dashboard3"],
    ],
    inscription: [
      ["@", "item_dashboard1"],
      ["@", "item_dashboard2"],
      ["@", "item_dashboard3"],
    ],
    advance: [
      ["@", "item_dashboard1"],
      ["@", "item_dashboard2"],
      ["@", "item_dashboard3"],
    ],
  };

const SidebarBarRight = ({ item }) => {
  return (
    <div className="hidden lg:flex flex-col bg-white w-60 h-screen rounded-lg shadow-lg">
      <div className="overflow-scroll my-5 mx-4">

      {ItemsSidebarRight[item].map((u) => {
          return (
            <div className="my-4 text-xs hover:text-tic-100">
              <button className="mr-2">{u[0]}</button>
              <button  className="">{u[1]}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarBarRight;
