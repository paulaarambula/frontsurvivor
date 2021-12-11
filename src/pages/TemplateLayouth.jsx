import React, {useState}  from "react";

const Template = () => {
    const [resp, setResp] = useState(false);
    const [mov, setMov] = useState(false);
   
  return (
    <div className="relative flex flex-col h-screen ">
      {/* /////////////////////////////////////////////// */}
      {/* NavBar */}
      <div className="fixed bg-white w-full h-22 shadow z-20">
          {window.screen.width > 639 ? <button className="bg-red-200 p-2" onClick={()=>{setResp(!resp)}}>d</button> : <button className="bg-red-200 p-2" onClick={()=>{setMov(!mov)}}>m</button> }
      </div>
      {/* NavBar */}
      {/* /////////////////////////////////////////////// */}

      {/* /////////////////////////////////////////////// */}
      <div className="flex flex-row bg-green-50 mt-22 overflow-hidden z-10">
        {/* Sidebar Lef */}
        {resp ? <></> : <SideBarLeft mov={mov}/> }
          
        {/* Sidebar Lef */}

        {/* Sidebar Right */}
        <div className="hidden lg:flex flex-col bg-blue-200 w-60 h-screen rounded-lg shadow-lg">
          <div className="overflow-scroll">hola</div>
        </div>
        {/* Sidebar Right */}
      

      {/* Content */}
      <div className="bg-yellow-200 w-full flex flex-col ">
        <div className="overflow-scroll">hola</div>
      </div>
      {/* Content */}
      </div>
      {/* /////////////////////////////////////////////// */}
    </div>
  );
};

const SideBarLeft = ({mov}) => {
        return (
            <div className={`${mov ? "" : "hidden"} sm:flex flex-col bg-red-200 w-27 h-screen rounded-lg shadow-lg`}>
          <div className="overflow-scroll"></div>
        </div>
        )
    }

export default Template;