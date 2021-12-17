import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/users/queries";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import alerts from "../../utils/iziToast/alerts";
import { Enum_Rol } from "../../utils/enum";
import { Enum_Status } from "../../utils/enum";
import PrivateRoute from "../../components/PrivateRoute"
import PrivateComponent from "../../components/PrivateComponents";


const IndexUsers = () => {
  const sx = "15";
  const edit = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-edit"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const { data, error, loading } = useQuery(GET_USERS);
  useEffect(() => {}, [data]);

  useEffect(() => {
    if (error) {
      alerts.alertError(error);
    }
  }, [error]);

  if (loading) {
    return <div>Cargando....</div>;
  }

  return (
    <>
     <PrivateRoute rolesList={["LIDER", "ADMINISTRADOR"]}>
      <Header title={"Usuarios"} />
      <div className="text-xs pb-1 divide-x divide-gray-500">
        <div className="bg-white rounded-lg shadow-md px-8 py-8 divide-y divide-gray-100">
          <span className="text-lg text-gra">Listado</span>
          
          <table className="my-4 table-fixed w-full text-left divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="py-4">Nombre</th>
                <th className="py-4">Apellido</th>
                <th className="py-4">Identificación </th>
                <th className="py-4">Email</th>
                <th className="py-4">Rol</th>
                <th className="py-4">Estado</th>
                <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
                <th className="py-4">Opciones</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {data && data.Users ? (
                <>
                  {data.Users.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td className="py-4">{u.name}</td>
                        <td className="py-4">{u.lastname}</td>
                        <td className="py-4">{u.identification}</td>
                        <td className="py-4">{u.email}</td>
                        <td className="py-4">{Enum_Rol[u.rol]}</td>
                        <td className="py-4">{Enum_Status[u.status]}</td>
                        <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
                        <td className="py-4">
                          <Link to={`/admin/edit/user/${u._id}`}>
                            <span>{edit}</span>
                          </Link>
                        </td>
                        </PrivateComponent>
                       
                      </tr>
                    );
                  })}
                </>
              ) : (
                <div>no autorizado</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </PrivateRoute>
    </>
  );
};

export default IndexUsers;
