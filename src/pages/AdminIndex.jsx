import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Content from "../components/Content";

const AdminIndex = () => {
  const [modeResponsive, setModeResponsive] = useState(false);
  return (
    <>
      <div className="flex flex-col relative">
        <NavBar setModeResponsive={setModeResponsive} modeResponsive={modeResponsive}/>
        <div className="flex flex-row bg-gray-50 mt-22 h-screen">
          {!modeResponsive ? <SideBar /> : ""}
          <div className="bg-gray-50 w-screen">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminIndex;
