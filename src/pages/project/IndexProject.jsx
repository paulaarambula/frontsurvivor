import React, { useEffect, useState } from "react";
import { useUser } from "../../context/user";
import Card from "../../components/card/Card";
import CardSmall from "../../components/card/CardSmall";
import TitleCard from "../../components/card/TitleCard";
import Line from "../../components/Line";
import { useQuery } from "@apollo/client";
import {
  GET_PROJECTS,
  GET_PROJECT_BY_ID,
  GET_PROJECTS_BY_LEADER,
} from "../../graphql/project/queries";
import { EDIT_STAGE_PROJECT } from "../../graphql/project/mutation";
import { Link } from "react-router-dom";
import ButtonRedirect from "../../components/buttons/ButtonRedirect";
import PrivateComponent from "../../components/PrivateComponents";
import { CREATE_INSCRIPTION } from "../../graphql/incriptions/mutation";
import { CREATE_ADVANCEMENT } from "../../graphql/advancement/mutation";
import { useMutation } from "@apollo/client";

import alerts from "../../utils/iziToast/alerts";
import Input from "../../components/Input";
import useFormData from "../../hook/useFormData";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import {
  Enum_ProjectStage,
  Enum_ProjectStatus,
  Enum_Rol,
  Enum_StatusIncription,
} from "../../utils/enum";

const IndexProject = () => {
  const { userData } = useUser();
  console.log("userData: ", userData._id)
  const [viewForm, setViewForm] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const [_id, setId] = useState("");
  const { data, error, loading } = useQuery(GET_PROJECTS);
  var listProjectByLeader = {}

  const filter = () =>{
    var jj = []
    data.ListProjects.map((u)=>{
      if(u.leader._id === userData._id){
        jj.push(u)
      }
    })
    return jj

  }

  if(data){
    listProjectByLeader["ListProjects"] = filter();
  }

  const {
    data: dataByID,
    errorByID,
    loadingByID,
  } = useQuery(GET_PROJECT_BY_ID, { variables: { _id } });

  const [
    createIncription,
    {
      data: mutationDataInscription,
      loading: mutationLoadingInscription,
      error: mutationErrorInscription,
    },
  ] = useMutation(CREATE_INSCRIPTION);

  const [
    createAdvancement,
    {
      data: mutationDataAdvancement,
      loading: mutationLoadingAdvancement,
      error: mutationErrorAdvancement,
    },
  ] = useMutation(CREATE_ADVANCEMENT);

  const [
    editStageProject,
    {
      data: mutationDataStageProject,
      loading: mutationLoadingStageProject,
      error: mutationStageErrorProject,
    },
  ] = useMutation(EDIT_STAGE_PROJECT);

  const statusLastIncriptions = () => {
    const list = [];
    if (dataByID) {
      dataByID["DetailProject"].inscription.map((u) => {
        list.push(u.statusInscription);
      });
    }
    const lastElement = list[list.length - 1];
    return lastElement;
  };

  const listIdInscrip = statusLastIncriptions();

  // console.log("dataByID", dataByID);
  console.log("data", data);
  // console.log("UserData", userData );
  // console.log("listIdInscrip", listIdInscrip );

  useEffect(() => {
    if (mutationDataInscription) {
      alerts.alertSucees("Registro exitoso");
    }
    if (mutationDataAdvancement) {
      alerts.alertSucees("Avance Creado");
    }
    if (mutationDataStageProject) {
      alerts.alertSucees("El proyecto a cambiado su estado a En Desarrollo");
    }
  }, [
    mutationDataInscription,
    mutationDataAdvancement,
    mutationDataStageProject,
  ]);

  useEffect(() => {
    if (error) {
      // alerts.alertErrorMessage("Error consultando los usurios");
    }
  }, [error]);

  const createIncription_ = () => {
    createIncription({ variables: { project: _id, student: userData._id } });
  };

  const DataSendMutacion = (_id_ = _id) => {
    const createdBy = { createdBy: userData._id };
    const project = { project: _id_ };
    const { date, description, ...observations_ } = formData;
    const { observations, ...data_ } = formData;
    const o = {
      observations: [observations_["observations"]],
    };
    const Data = { ...createdBy, ...project, ...o, ...data_ };
    return Data;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (dataByID["DetailProject"]["advancement"].length === 0) {
      editStageProject({
        variables: { _id: _id, stageProject: "EN_DESARROLLO" },
      });
    }

    createAdvancement({ variables: DataSendMutacion() });
  };

  if (loading) return <div>Cargando....</div>;

  const circeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
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
  const plus = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-plus-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
  return (
    <>
      <PrivateComponent rolesList={["ADMINITRADOR", "LIDER"]}>
        <div className="flex mx-4 justify-end">
          <ButtonRedirect nameButton="Nuevo" redirect="/admin/project/create" />
        </div>
      </PrivateComponent>
      <div className="flex flex-col md:flex-row text-md ">
        <div className="flex-1 pb-1 m-0.5">
          <Card>
            <TitleCard title="Listado" />
            <Line />
            <table className="my-4 table-fixed w-full text-center divide-y divide-gray-100 text-xs">
              <thead>
                <tr>
                  <th className="py-4">Projecto</th>
                  <th className="py-4">Fecha</th>
                  <th className="py-4">Presupuesto</th>
                  <th className="py-4">Etapa</th>
                  <th className="py-4">Estado</th>
                  <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
                    <th className="py-4">Op.</th>
                  </PrivateComponent>
                </tr>
              </thead>
              
              {userData.rol === "LIDER" ? <Table
                  data={listProjectByLeader}
                  setId={setId}
                  userData={userData}
                  edit={edit}
                />:
                <Table
                  data={data}
                  setId={setId}
                  userData={userData}
                  edit={edit}
                />}
             
                
            
            </table>
          </Card>
        </div>
        <div className="flex-1  m-0.5">
          <Card>
            {/* Header card */}
            <div className="flex flex-col md:flex-row md:justify-between items-center text-xs mt-9 px-7">
              <div className="flex flex-col">
                <span className="font-bold text-3xl items-center text-gray-100">
                  {dataByID && dataByID.DetailProject.nameProject}
                </span>
                <div className="flex flex-row">
                  <div className="flex flex-row mt-1 items-center md:items-left">
                    <span className="text-tic-green">{circeIcon}</span>
                    <span className="text-xs mx-1">
                      {dataByID &&
                        dataByID.DetailProject.stageProject.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex flex-row  mt-1 items-center md:items-left">
                    <span className="text-tic-250">{circeIcon}</span>
                    <span className="text-xs mx-1">
                      {dataByID &&
                        dataByID.DetailProject.statusProject.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-left">
                  <span className="text-xxs">Presupuesto:</span>
                  <span className="text-xs font-bold">
                    ${dataByID && dataByID.DetailProject.budget}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div>
                  <span className="flex text-sm bg-gray-100 h-6 py-1 px-4 rounded-xl mt-4">
                    {dataByID &&
                      dataByID.DetailProject.leader["name"] +
                        " " +
                        dataByID.DetailProject.leader["lastname"]}
                  </span>
                  <span className="text-xxs pl-4">Líder</span>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full hidden md:flex -ml-3"></div>
              </div>
            </div>
            <Line />
            {/* Header card */}

            {/* Body card */}
            <div className="text-sm mt-4 px-7">
              <h5 className="mb-2 text-lg font-bold">Objetivos</h5>
              {dataByID &&
                dataByID.DetailProject.objective.map((u) => {
                  return (
                    <CardSmall>
                      <p>
                        <span className="font-bold">{u.typeObjective}: </span>
                        {" " + u.description}
                      </p>
                    </CardSmall>
                  );
                })}
            </div>
            <Line />
            <div className="text-sm mt-4 px-7">
              <div className="flex flex-row justify-between">
                <h5 className="mb-2 text-lg font-bold">Avances</h5>
                {(dataByID &&
                  (dataByID.DetailProject.stageProject === "TERMINADO") &
                    (userData.rol !== Enum_Rol.ADMINISTRADOR)) ||
                listIdInscrip === Enum_StatusIncription.RECHAZADA ? (
                  <></>
                ) : (
                  <button
                    className="bg-red-200"
                    onClick={() => {
                      setViewForm(!viewForm);
                    }}
                  >
                    <span>Agregar Avance</span>
                  </button>
                )}
              </div>
              {!viewForm ? (
                <></>
              ) : (
                <FormAdvancement
                  submitForm={submitForm}
                  updateFormData={updateFormData}
                  form={form}
                />
              )}

              {dataByID &&
                dataByID.DetailProject.advancement.map((u) => {
                  return (
                    <CardSmall>
                      <p className="mt-2">
                        <span className="font-bold text-sm">Descripción: </span>
                        {u.description}
                      </p>
                      <span className="mt-3 text-xs font-bold">
                        creado por: {" " + u.createdBy["name"]}
                        CC: {" " + u.createdBy["identification"]}
                      </span>
                      <span className="mt-2">Obervación: {u.observations}</span>
                    </CardSmall>
                  );
                })}
            </div>
            <Line />
            <div className="text-xs mt-4 px-7">
              <div className="flex flex-row justify-between">
                <h5 className="mb-2 text-lg font-bold">Incripciones</h5>
                {dataByID &&
                dataByID.DetailProject.stageProject === "TERMINADO" &&
                userData.rol !== Enum_Rol.ADMINISTRADOR ? (
                  <></>
                ) : (
                  <button onClick={() => createIncription_()}>
                    <span>{plus}</span>
                  </button>
                )}
              </div>
              {dataByID &&
                dataByID.DetailProject.inscription.map((u) => {
                  return (
                    <CardSmall>
                      <span className="font-bold text-xs">
                        Estudiante: {" " + u.student["name"]}
                      </span>
                      <span className="font-bold text-xs">
                        Estado: {" " + u.statusInscription}
                      </span>
                      <span className="font-bold text-xs">
                        Fecha de Inicio: {" " + u.dateStart}
                      </span>
                      <span className="font-bold text-xs">
                        Fecha de Alta: {" " + u.dateEnd}
                      </span>
                    </CardSmall>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

const FormAdvancement = ({ submitForm, form, updateFormData }) => {
  return (
    <form
      className="mx-8 my-5"
      onSubmit={submitForm}
      ref={form}
      onChange={updateFormData}
    >
      <Input type="date" name="date" label="Fecha" />
      <Input type="text" name="description" label="Descripción" />
      <Input type="text" name="observations" label="Observaciones" />
      <ButtonLoading type="submit" nameButton="Guadar" />
    </form>
  );
};

const Table = ({ data, setId, userData, edit }) => {
  return (
    <tbody>
      {data &&
        data.ListProjects.map((u) => {
          return (
            <tr
              key={u._id}
              className="hover:bg-gray-50"
              onClick={() => {
                setId(u._id);
              }}
            >
              <td className="py-4">{u.nameProject}</td>
              <td className="py-4">
                {u.startDate === null ? "Pendiente" : u.startDate.slice(0, 10)}
              </td>
              <td className="py-4">$ {u.budget}</td>
              <td className="py-4">{u.stageProject.toLowerCase()}</td>
              <td className="py-4">{u.statusProject.toLowerCase()}</td>
              {u.stageProject === "TERMINADO" &&
              userData.rol !== Enum_Rol.ADMINISTRADOR ? (
                <></>
              ) : (
                <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
                  <td className="flex py-4 justify-center">
                    <Link to={`/admin/edit/project/${u._id}`}>
                      <span>{edit}</span>
                    </Link>
                  </td>
                </PrivateComponent>
              )}
            </tr>
          );
        })}
    </tbody>
  );
};
export default IndexProject;
