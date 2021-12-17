import React, { useEffect, useState } from "react";
import { useUser } from "../../context/user";
import { editIcon } from "../../utils/icons";
import FilterAndSearch from "../../components/FilterAndSearch";
import TitleAndNavegation from "../../components/TitleAndNavegation";
import Card from "../../components/card/Card";
import CardSmall from "../../components/card/CardSmall";
import TitleCard from "../../components/card/TitleCard";
import Line from "../../components/Line";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT_BY_ID } from "../../graphql/project/queries";
import { EDIT_STAGE_PROJECT } from "../../graphql/project/mutation";
import { Link } from "react-router-dom";
import ButtonRedirect from "../../components/buttons/ButtonRedirect";
import SwitchBotton from "../../components/buttons/SwitchBotton";
import PrivateComponent from "../../components/PrivateComponents";
import { CREATE_INSCRIPTION } from "../../graphql/incriptions/mutation";
import { CREATE_ADVANCEMENT } from "../../graphql/advancement/mutation";
import { useMutation } from "@apollo/client";
import alerts from "../../utils/iziToast/alerts";
import Input from "../../components/Input";
import useFormData from "../../hook/useFormData";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import { Enum_Rol, Enum_StatusIncription } from "../../utils/enum";

const IndexProject = () => {
  const { userData } = useUser();
  const [viewForm, setViewForm] = useState(false);
  const [viewPopUpFilter, setViewPopUpFilter] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const [_id, setId] = useState("");
  const { data, error, loading } = useQuery(GET_PROJECTS);
  const [valueFilterListProject, setValueFilterListProject] =
    useState("Estado");
  var listProjectByLeader = {};
  console.log("data", data);

  const filter = () => {
    var active = [];
    var inactive = [];
    var todos = [];
    data.ListProjects.map((u) => {
      if (u.leader._id === userData._id) {
        if (
          valueFilterListProject === "Activo" &&
          u.statusProject === "ACTIVO"
        ) {
          active.push(u);
        }
        if (
          valueFilterListProject === "Inactivo" &&
          u.statusProject === "INACTIVO"
        ) {
          inactive.push(u);
        } else {
          todos.push(u);
        }
      }
    });
    if (valueFilterListProject === "Activo") {
      return active;
    }
    if (valueFilterListProject === "Inactivo") {
      return inactive;
    } else {
      return todos;
    }
  };


  if (data) {
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
  const stageProject = () => {
    var stage = "";
    if (dataByID) {
      if (dataByID.DetailProject.stageProject.toLowerCase() === "iniciado") {
        stage = "bg-tic-75 h-0.5 w-4/12";
      }
      if (dataByID.DetailProject.stageProject.toLowerCase() === "en progreso") {
        stage = "bg-tic-75 h-0.5 w-8/12";
      }
      if (dataByID.DetailProject.stageProject.toLowerCase() === "terminado") {
        stage = "bg-tic-75 h-0.5 w-full";
      }
    }
    return stage;
  };
  // console.log("dataByID", dataByID);
  // console.log("data", data);
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

  return (
    <>
      <div className="flex flex-col px-4 mt-4 ">
        <div className="flex flex-row justify-between pb-8">
          <TitleAndNavegation
            title="Lista de proyectos"
            items={["Inicio", "Proyectos", "Lista"]}
          />
          <div className="">
            <PrivateComponent rolesList={["ADMINITRADOR", "LIDER"]}>
              <div className="flex mx-4">
                <ButtonRedirect
                  nameButton="Nuevo Proyecto"
                  redirect="/admin/project/create"
                />
              </div>
            </PrivateComponent>
          </div>
        </div>

        <FilterAndSearch
          setViewPopUpFilter={setViewPopUpFilter}
          viewPopUpFilter={viewPopUpFilter}
          setValueFilterListProject={setValueFilterListProject}
          valueFilterListProject={valueFilterListProject}
        />
      </div>

      <div className="flex flex-col md:flex-row text-md ">
        <div
          onMouseEnter={() => {
            setViewPopUpFilter(false);
          }}
          className="flex-1 pb-1 m-0.5"
        >
          <Card>
            <TitleCard title="Registros encontrados" />
            <Line />
            <div className="px-6">
              <table className="table-fixed w-full text-left divide-y divide-gray-100 text-xs">
                <thead>
                  <tr>
                    <th className="pb-2">Projecto</th>
                    <th className="pb-2">Fecha</th>
                    <th className="pb-2">Presupuesto</th>
                    <th className="pb-2">Etapa</th>
                    <th className="pb-2">Estado</th>
                    <PrivateComponent rolesList={["ADMINISTRADOR", "LIDER"]}>
                      <th className="pb-2 w-7">Op.</th>
                    </PrivateComponent>
                  </tr>
                </thead>
                {userData.rol === "LIDER" ? (
                  <Table
                    data={listProjectByLeader}
                    setId={setId}
                    userData={userData}
                    edit={editIcon()}
                  />
                ) : (
                  <Table
                    data={data}
                    setId={setId}
                    userData={userData}
                    edit={editIcon()}
                  />
                )}
              </table>
            </div>
          </Card>
        </div>
        <div className="flex-1  m-0.5">
          <Card>
            {/* Header card */}
            <div className="flex flex-col text-xs">
              <div className="pl-5">
                {dataByID &&
                dataByID.DetailProject.statusProject.toLowerCase() ===
                  "activo" ? (
                  <div class="relative h-3 w-3">
                    <div class="animate-ping h-full w-full rounded-full bg-green-400 opacity-75"></div>
                    <div class="absolute rounded-full h-3 w-3 bg-green-500 top-0"></div>
                  </div>
                ) : (
                  <div class="relative h-3 w-3">
                    <div class="animate-ping h-full w-full rounded-full bg-red-400 opacity-75"></div>
                    <div class="absolute rounded-full h-3 w-3 bg-red-500 top-0"></div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center mt-7">
                <span className="text-tic-100 text-3xl uppercase">
                  {dataByID && dataByID.DetailProject.nameProject}
                </span>
                <span className="text-gray-75 text-md">
                  Líder:{" "}
                  {dataByID &&
                    dataByID.DetailProject.leader["name"] +
                      " " +
                      dataByID.DetailProject.leader["lastname"]}
                </span>
                <span className="text-gray-75 text-md">
                  Presupuesto: ${dataByID && dataByID.DetailProject.budget}
                </span>
              </div>
              <div className="flex flex-row w-full bg-gray-100 mt-16">
                <div className={stageProject()}></div>
              </div>
            </div>
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
                  <PrivateComponent rolesList={["ESTUDIANTE"]}>
                  <SwitchBotton
                    name="Nuevo"
                    setValue={setViewForm}
                    value={viewForm}
                  />
                  </PrivateComponent>
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
                   <PrivateComponent rolesList={["ESTUDIANTE"]}>
                  <div className="flex flex-row items-center justify-center border border-tic-25 rounded-xl h-5 pr-6 pl-1">
                    <button
                      onClick={() => createIncription_()}
                      className="flex items-center bg-tic-75 rounded-xl h-3 text-white text-xxs px-2"
                    >
                      Inscribirme
                    </button>
                  </div>
                  </PrivateComponent>
                  // <ButtonBorderLine name_="Nuevo" value_={createIncription_()}/>
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

// ()=>{setViewPopUpFilter(true)}
