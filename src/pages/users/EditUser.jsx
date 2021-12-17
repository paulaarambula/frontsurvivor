import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { GET_USER } from "../../graphql/users/queries";
import { EDIT_USER } from "../../graphql/users/mutation";
import Input from "../../components/Input";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import DropDown from "../../components/DropDown";
import Header from "../../components/Header";
import useFormData from "../../hook/useFormData";
import alerts from "../../utils/iziToast/alerts";
import { Enum_Status, Enum_Status_Filter_Leader } from "../../utils/enum";
import PrivateComponent from "../../components/PrivateComponents";
import { useUser } from "../../context/user";

const EditUser = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const {userData} = useUser();
  const _id_  = useParams();
  const _id =  _id_["_id"]
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USER, {
    variables: { _id },
  });

  console.log("data: ", queryData)
  const [
    editUser,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_USER);

  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("Usuario modificado correctamente");
    }
  }, [mutationData]);

  const submitForm = (e) => {
    e.preventDefault();
    editUser({
      variables: {
        _id,
        ...formData,
      },
    })
  };

  useEffect(() => {
    if (mutationError) {
      alerts.alertErrorMessage("Error al ejecutar la mutación");
    }
    if (queryError) {
      alerts.alertErrorMessage("Error ejecutar la consulta");
    }
  }, [queryError, mutationError]);


  if (queryLoading) {
    return <div>Cargando....</div>;
  }

  return (
    <>
      <Header title="Edición de Usuarios" />
      <div className="flex flex-row">
        <div className="text-xs pb-1 divide-x divide-gray-500 w-1/2 mx-1">
          <div className="bg-white rounded-lg shadow-md px-8 py-8 divide-y divide-gray-100">
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className=""
            >
              <Input
                type="text"
                name="name"
                required={true}
                label="Nombre"
                defaultValue={queryData.User.name}
                disabled={userData.rol !== "ESTUDIANTE" ? true : false }
              />
              <Input
                type="text"
                name="lastname"
                required={true}
                label="Apellido"
                defaultValue={queryData.User.lastname}
                disabled={userData.rol !== "ESTUDIANTE" ? true : false}
              />
              <Input
                type="text"
                name="identification"
                required={true}
                label="Identificación"
                defaultValue={queryData.User.identification}
                disabled={userData.rol !== "ESTUDIANTE" ? true : false}
              />
              <Input
                type="text"
                name="email"
                required={true}
                label="Email"
                defaultValue={queryData.User.email}
                disabled={userData.rol !== "ESTUDIANTE" ? true : false}
              />
              <Input
                type="text"
                label="Rol"
                defaultValue={queryData.User.rol}
                disabled={ true }
              />
              <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
              <DropDown
                label="Estado"
                name="status"
                defaultValue={queryData.User.status}
                required={true}
                options={userData.rol === "ADMINISTRADOR" ? Enum_Status : Enum_Status_Filter_Leader }
              />
              </PrivateComponent>
              <ButtonLoading
                nameButton="Guardar"
                type="submit"
                loading={mutationLoading}
                disabled={Object.keys(formData).length === 0}
              />
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-tic-75 rounded-lg"></div>
      </div>
    </>
  );
};

export default EditUser;
