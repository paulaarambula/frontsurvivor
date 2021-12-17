import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import useFormData from "../../hook/useFormData";
import { editIcon, checkIcon, slashIcon } from "../../utils/icons";
import { GET_PROJECT_BY_ID } from "../../graphql/project/queries";
import { EDIT_PROJECT, EDIT_OBJECTIVE } from "../../graphql/project/mutation";
import { EDIT_INSCRIPTION_ENDDATE_NOW } from "../../graphql/incriptions/mutation";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import TitleCard from "../../components/card/TitleCard";
import Line from "../../components/Line";
import Input from "../../components/Input";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import DropDown from "../../components/DropDown";
import {
  Enum_ProjectStatus,
  Enum_ProjectStage,
} from "../../utils/enum";
import Header from "../../components/Header";
import alerts from "../../utils/iziToast/alerts";
import PrivateComponent from "../../components/PrivateComponents";
import CardSmall from "../../components/card/CardSmall";

const FileTable = ({ data, inc_, _id }) => {
  console.log("data: ", data);
  const [edit, setEdit] = useState(false);
  const [dataObjective, setDataObjective] = useState({
    description: data.description,
    typeObjective: data.typeObjective.toUpperCase()
  });
  const idProject =  _id
  const indexObjective = inc_
 
  const [
    editObjective,
    {
      data: mutationDataObjective,
      loading: mutationLoadingObjective,
      error: mutationErrorObjective,
    },
  ] = useMutation(EDIT_OBJECTIVE);
  console.log("index: ", indexObjective, "idProject: ",idProject, "field: ",  dataObjective)

  const mutationObjective = () =>{
    editObjective({
      variables: {
        idProject,
        indexObjective,
        field: dataObjective
      },
    });

  }
  useEffect(() => {
    if (mutationDataObjective) {
      alerts.alertSucees("Objetivo modificada correctamente");
      //   redireccionar
    }
  }, [mutationDataObjective]);

  useEffect(() => {
    if (mutationErrorObjective) {
      alerts.alertErrorMessage("Error al cambiar el estado de la inscripcioón");
    }
  }, [mutationErrorObjective]);

  if (mutationLoadingObjective) {
    return <div>Cargando....</div>;
  }



  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input type="text" disabled="true" defaultValue={inc_} />
            
          </td>
          <td>
          <textarea 
          type="text" 
          className="rounded-sm h-9 border border-gray-300 w-full mt-2 focus:outline-none pl-2 focus:border-tic-50"
          defaultValue={dataObjective.description} 
          name="name" 
          onChange={(e)=>setDataObjective({...dataObjective, description: e.target.value})} />
          </td>
          <td>
          <select
              defaultValue={dataObjective.typeObjective}
              className="rounded-sm h-9 border border-gray-300 w-full mt-2 focus:outline-none pl-2 focus:border-tic-50"
              onChange={(e) =>
                setDataObjective({ ...dataObjective, typeObjective: e.target.value.toUpperCase() })
              }
            >
              <option value="">Seleccione una opción</option>
              <option value="General">GENERAL</option>
              <option value="Específico">ESPECIFICO</option>
            </select>
            
          </td>
          <td>
    
              <div className="flex flex-row justify-center">
            <button
              className="mx-0.5"
              onClick={() => mutationObjective()}
            >
              {checkIcon("15", "none", "2")}
            </button>
            <button
              className="mx-0.5"
              onClick={() => setEdit(!edit)}
            >
              {slashIcon("15", "none", "2")}
            </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>
            <CardSmall> {inc_}</CardSmall>{" "}
          </td>
          <td>
            <CardSmall>{data.description}</CardSmall>
          </td>
          <td>
            <CardSmall>{data.typeObjective}</CardSmall>
          </td>
          <CardSmall>
            <div className="flex flex-row">
              <button
                className="py-1"
                onClick={() => setEdit(!edit)}
              >
                {editIcon()}
              </button>
            </div>
        
          </CardSmall>
        </>
      )}
    </tr>
  );
  
};

const EditProject = () => {
  const { form, formData, updateFormData } = useFormData(null);
  // const [editMutaObjective, setEditMutaObjective] = useState(false);
  // const [objective, setObjective] = useState("");
  // const [jj, setJj] = useState(0);
  var numetionObjective = 0;
  const _id_ = useParams();
  const _id = _id_["_id"];
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROJECT_BY_ID, {
    variables: { _id },
  });
  const [
    editProject,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_PROJECT);

  const increment = () => {
    numetionObjective = numetionObjective + 1;
    const tostring = numetionObjective + "";
    return tostring;
  };
  

  
  const [
    editInscriptionEndDate,
    {
      data: mutationDataInscription,
      loading: mutationLoadingInscription,
      error: mutationErrorInscription,
    },
  ] = useMutation(EDIT_INSCRIPTION_ENDDATE_NOW);

  const listIdInscriptionsBYProjects = () => {
    const list = [];
    if (queryData) {
      queryData["DetailProject"].inscription.map((u) => {
        list.push(u._id);
      });
    }
    return list;
  };
  const listIdInscrip = listIdInscriptionsBYProjects();
  // console.log("formData", formData);
  // console.log("arrayObjectiveForm: ", arrayObjectiveForm());

  const submitForm = (e) => {
    e.preventDefault();
    //  console.log("formData", formData);

    formData["budget"] = parseFloat(formData["budget"]);
    if (
      formData["statusProject"] === "ACTIVO" &&
      formData["stageProject"] === "NULO"
    ) {
      formData["stageProject"] = "INICIADO";
      const yourDate = new Date(Date.now());
      formData["startDate"] = yourDate.toISOString().split()[0];
      console.log("formDataFilter", formData);
    }
    if (formData["statusProject"] === "INACTIVO") {
      //Si cambia el estado del proyecto a estado inactivo, todas las fechas de finalización del las inscripcines asociadas a ese proyecto y que esten vacias, quedan automaticamente con la fecha actual.
      listIdInscrip.map((u) => {
        editInscriptionEndDate({ variables: { _id: u } });
      });
    }
    if (formData["stageProject"] === "TERMINADO") {
      // Si la fase del proyecto cambia a terminado, el estado cambia a inactivo
      formData["statusProject"] = "INACTIVO";
      const yourDate = new Date(Date.now());
      formData["endDate"] = yourDate.toISOString().split()[0];

      editProject({
        variables: {
          _id,
          fields: formData,
        },
      });
      listIdInscrip.map((u) => {
        editInscriptionEndDate({ variables: { _id: u } });
      });
    } else {
      editProject({
        variables: {
          _id,
          fields: formData,
        },
      });
    }
  };

  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("Usuario modificado correctamente");
      //   redireccionar
    }
  }, [mutationData, mutationDataInscription]);

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
  console.log("data: ", queryData);

  return (
    <>
      <Card>
        <TitleCard title="Nuevo Proyecto" />
        <Line />

        <form
          className="mx-8 my-5"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <Header title="Información General" />
          <div className="flex flex-row">
            <div className="flex-1 mr-1">
              <Input
                type="text"
                name="nameProject"
                required={true}
                label="Nombre"
                defaultValue={queryData && queryData.DetailProject.nameProject}
              />
            </div>
            <div className="flex-1 mr-1">
              <Input
                type="number"
                name="budget"
                required={true}
                label="Presupuesto"
                defaultValue={queryData && queryData.DetailProject.budget}
              />
            </div>
          </div>
          <PrivateComponent rolesList={["ADMINISTRADOR"]}>
            <div className="flex flex-row">
              <div className="flex-1 mr-1">
                <DropDown
                  label="Fase"
                  name="stageProject"
                  defaultValue={
                    queryData && queryData.DetailProject.stageProject
                  }
                  required={true}
                  options={Enum_ProjectStage}
                />
              </div>
              <div className="flex-1 mr-1">
                <DropDown
                  label="Estado"
                  name="statusProject"
                  defaultValue={
                    queryData && queryData.DetailProject.statusProject
                  }
                  required={true}
                  options={Enum_ProjectStatus}
                />
              </div>
            </div>
          </PrivateComponent>

          <PrivateComponent rolesList={["LIDER"]}>
            <div className="flex flex-row">
              <div className="flex-1 mr-1">
                <Input
                  type="text"
                  name="stageProject"
                  required={true}
                  label="Fase"
                  defaultValue={
                    queryData && queryData.DetailProject.stageProject
                  }
                  disabled
                />
              </div>
              <div className="flex-1 mr-1">
                <Input
                  type="text"
                  label="Estado"
                  name="statusProject"
                  defaultValue={
                    queryData && queryData.DetailProject.statusProject
                  }
                  required={true}
                  disabled
                />
              </div>
            </div>
          </PrivateComponent>
          <ButtonLoading nameButton="Guardar" type="submit" />
        </form>
      </Card>
      <Card>
        <div className="px-8">
          <table className="my-4 table-fixed w-full text-left divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="py-4 w-1/24">#</th>
                <th className="py-4 w-17/24">Descipción</th>
                <th className="py-4 w-4/24">Tipo </th>
                <th className="py-4 w-1/24">Op. </th>
              </tr>
            </thead>
            <tbody>
              {queryData.DetailProject.objective.map((data) => {
                
                return(
                   
                  <FileTable data={data}  inc_ = {increment()-1} _id={_id}/>

                ) 
              })}
            </tbody>
          </table>
          <Line />
        </div>
      </Card>
    </>
  );
};


export default EditProject;

// const arrayObjectiveForm = () => {
//   const { budget, nameProject, stageProject, statusProject, ...rest } =
//     formData;
//   const values = Object.values(rest);
//   const obj = [];
//   const arrayObjective = [];

//   for (var i = 0; i < values.length; i++) {
//     if (i % 2 === 0) {
//       if (i % 2 !== 0) {
//         //pass
//       } else {
//         obj[i] = { description: values[i], typeObjective: values[i + 1] };
//       }
//     }
//   }

//   obj.map((u) => {
//     arrayObjective.push(u);
//   });
//   if (
//     formData.statusProject === undefined ||
//     formData.stageProject === undefined
//   ) {
//     const dataMutacion = {
//       budget: formData.budget,
//       nameProject: formData.nameProject,
//       stageProject: queryData.DetailProject.stageProject,
//       statusProject: queryData.DetailProject.statusProject,
//       objective: arrayObjective,
//     };
//     return dataMutacion;
//   } else {
//     const dataMutacion = {
//       budget: formData.budget,
//       nameProject: formData.nameProject,
//       stageProject: formData.stageProject,
//       statusProject: formData.statusProject,
//       objective: arrayObjective,
//     };
//     return dataMutacion;
//   }
// };
