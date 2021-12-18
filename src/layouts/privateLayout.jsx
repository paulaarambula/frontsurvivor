import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SidebarBarRight from "../components/SidebarBarRight";
import { Outlet } from "react-router-dom";
import Content from "../components/Content";
import { useMutation } from "@apollo/client";
import { useAuth } from "../context/authContext";
import { REFRESH_TOKEN } from "../graphql/auth/mutation";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const PrivateLayouth = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [responsiveButton, setResponsiveButton] = useState(false);
  const [movilResponsiveButton, setMovilResponsiveButton] = useState(false);
  const [itemsSidebar, setItemsSidebar] = useState(false);
  const [popupInfoProfile, setPopupInfoProfile] = useState(false);
  const { setToken } = useAuth(); //authToken => Incluir para monitorizar el estado actual del token
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [
    refreshToken,
    { data: mutationData, loading: mutationLoading }, // error: mutationError => Usar para controlar errores
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    // console.log("mutationData: ", mutationData)
    if (mutationData) {
      if (mutationData.refreshToken.token) {
        setToken(mutationData.refreshToken.token);
      } else {
        setToken(null);
        navigate("/auth/login");
      }
      setLoadingAuth(false);
    }
  }, [mutationData, setToken, loadingAuth, navigate]);

  const MouseEnter = () => {
    setItemsSidebar(false);
    setPopupInfoProfile(false);
  };
  if (mutationLoading || loadingAuth) return <div>Loading...</div>;

  return (
    
      <div className="relative flex flex-col h-screen font-nunito">
        <NavBar
          popupInfoProfile={popupInfoProfile}
          setPopupInfoProfile={setPopupInfoProfile}
          setToken={setToken}
          responsiveButton={responsiveButton}
          movilResponsiveButton={movilResponsiveButton}
          setResponsiveButton={setResponsiveButton}
          setMovilResponsiveButton={setMovilResponsiveButton}

        />
        <div className="flex flex-row bg-gray-50 mt-22 overflow-hidden z-10">
          {responsiveButton ? <></> : <SideBar movilResponsiveButton={movilResponsiveButton} setItemsSidebar={setItemsSidebar} setItem={setItem}
             /> }
      
          {itemsSidebar ? <SidebarBarRight item={item} /> : <></>}
          <div
            className="bg-gray-50 w-full flex flex-col"
            onMouseEnter={() => {
              MouseEnter();
            }} >
          <div className="overflow-auto">
            <Content>
              <Outlet />
            </Content>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default PrivateLayouth;
