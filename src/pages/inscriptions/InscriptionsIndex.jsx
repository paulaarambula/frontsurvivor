import React, { useState, useEffect } from "react";
import { arrowDownIcon, searchIcon, editIcon } from "../../utils/icons";
import CardList from "../../components/card/CardList";
import Line from "../../components/Line";
import { GET_INSCRIPTIONS } from "../../graphql/incriptions/query";
import { GET_INSCRIPTIONS_BY_ID } from "../../graphql/incriptions/query";
import { useQuery } from "@apollo/client";
import { Enum_StatusIncription } from "../../utils/enum";
import { useMutation } from "@apollo/client";
import alerts from "../../utils/iziToast/alerts";
import { EDIT_INSCRIPTION_BY_ID } from "../../graphql/incriptions/mutation";
import useFormData from "../../hook/useFormData";
import DropDown from "../../components/DropDown";
import ButtonLoading from "../../components/buttons/ButtonLoading";

const InscriptionsIndex = () => {
  const [viewPopUpFilter, setViewPopUpFilter] = useState(false);
  const { form, formData, updateFormData } = useFormData(null);
  const [_id, set_Id] = useState("");
  const [valueFilterListProject, setValueFilterListProject] =
    useState("Estado");
  const [editStage, setEditStage] = useState(false);
  const { data, error, loading } = useQuery(GET_INSCRIPTIONS);
  const [listInscriptions, setListInscriptions] = useState({});
  const [
    editInscription,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_INSCRIPTION_BY_ID);
 console.log("listInscriptions: ", listInscriptions);
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPTIONS_BY_ID, {
    variables: { _id },
  });
//   console.log("querydata", queryData)
//   console.log("editStage", editStage)

  const submitForm = (e) => {
    e.preventDefault();
    editInscription({
      variables: {
        _id,
        statusInscription: formData.stageProject,
      },
    });
  };
  
  useEffect(() => {
    if (data) {
      const lu = {};
      data.Inscriptions.forEach((elemento) => {
        console.log("lement: ", elemento)
      });

      setListInscriptions(lu);
    }
  }, [data]);

  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("Inscripción modificada correctamente");
      setEditStage(false);
      
      //   redireccionar
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      alerts.alertErrorMessage("Error al cambiar el estado de la inscripcioón");
    }
  }, [mutationError]);

  const stageAndGetID = (_id_) =>{
    setEditStage(true);
    set_Id(_id_);
  }

  if (mutationLoading) {
    return <div>Cargando....</div>;
  }
  return (
    <>
      <div className="flex flex-row items-end mt-12 mb-5">
        <span className="text-2xl items-end mr-6 text-gray-100">
          Listado de Inscripciones
        </span>
        <div className="flex flex-row text-xs list-none pb-0.5 divide-x divide-gray-400">
          <li className="px-2">Inicio</li>
          <li className="px-2">Projecto</li>
          <li className="px-2">Inscripciones</li>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-2">
        <div className="relative flex flex-row ">
          <div
            onClick={() => {
              setViewPopUpFilter(!viewPopUpFilter);
            }}
            className="flex flex-row border justify-center items-center text-xs rounded-xl mx-0.5 py-1 px-4 border-gray-400 hover:bg-tic-100 hover:border-tic-50 hover:text-white"
          >
            <span> Filtrar por: {valueFilterListProject} </span>
            <span className="pl-2">{arrowDownIcon()}</span>
          </div>
          {!viewPopUpFilter ? (
            <></>
          ) : (
            <CardPopUp
              setValue={setValueFilterListProject}
              array={["Activo", "Inactivo"]}
            />
          )}

          <div className="flex flex-row border justify-between items-center text-xs rounded-xl mx-0.5 px-4 border-gray-400 ">
            <input
              type="text"
              placeholder="Búsqueda"
              className="py-1 bg-transparent focus:outline-none"
            />
            <button className="pl-2">{searchIcon("14", "1")}</button>
          </div>
        </div>
        <div className="flex flex-row text-xs justify-center items-center">
          <span>0-10 de 20</span>
          <div className="flex flex-row justify-center items-center rounded-lg border border-gray-200 hover:bg-tic-100 hover:text-white px-2 mx-0.5">
            <span>8</span>
            <span className="mx-0.5">{arrowDownIcon()}</span>
          </div>
        </div>
      </div>
      <Line />
      <div className="bg-gray-100 lg:h-10 rounded-xl px-8 font-bold">
        <div className="flex flex-col lg:flex-row w-full mt-3 text-sm text-left ">
          <span className="lg:w-6/24 text-center lg:text-left">Estudiante</span>
          <span className="lg:w-6/24 text-center lg:text-left">Projecto</span>
          <span className="lg:w-4/24 text-center lg:text-left">Ingreso</span>
          <span className="lg:w-4/24 text-center lg:text-left">Alta</span>
          <span className="lg:w-3/24 text-center lg:text-left">Estado</span>
          <span className="lg:w-1/24 text-center lg:text-left">Op.</span>
        </div>
      </div>
      {data &&
        data.Inscriptions.map((u) => {
          return (
            <CardList>
              <div className="flex flex-col lg:flex-row text-sm w-full ">
                <span className="lg:w-6/24 text-center lg:text-left">
                  {u.student.name + " " + u.student.lastName}
                </span>
                <span className="lg:w-6/24 text-center lg:text-left">
                  {u.project.nameProject}
                </span>
                <span className="lg:w-4/24 text-center lg:text-left">
                  {u.dateStart ? u.dateStart.slice(0, 10) : "Pendiente"}
                </span>
                <span className="lg:w-4/24 text-center lg:text-left">
                  {u.dateEnd ? u.dateEnd.slice(0, 10) : "Pendiente"}
                </span>
                <EditStageInscription u={u} />
                <span className="lg:w-1/24 text-center lg:text-left hover:text-tic-100">
                  <button
                    onClick={() => {
                        stageAndGetID(u._id);
                    }}
                  >
                    {editIcon()}
                  </button>
                </span>
              </div>
            </CardList>
          );
        })}
        {!editStage ? <></> :  <Modal
        form={form}
        submitForm={submitForm}
        updateFormData={updateFormData}
        queryData={queryData}
        setEditStage={setEditStage}
        
      />}
      
    </>
  );
};

const CardPopUp = ({ setValue, array }) => {
  return (
    <div className="flex flex-col bg-white w-40 z-50 absolute left-0 top-7 rounded-lg border border-gray-75 pt-2 pb-2 text-xs">
      {array.map((u) => {
        return (
          <li
            onClick={() => {
              setValue(u);
            }}
            className="flex hover:bg-tic-75 hover:text-white items-center h-6 py-4 pl-3"
          >
            <span>{u}</span>
          </li>
        );
      })}
    </div>
  );
};

const EditStageInscription = ({ u }) => {
  return (
    <>
      {u.statusInscription === "ACEPTADA" ? (
        <div className="lg:w-3/24 ">
          <span className="text-center text-white lg:text-left bg-blue-a rounded-xl px-2 py-1 text-xxs font-bold">
            {u.statusInscription}
          </span>
        </div>
      ) : (
        <div className="lg:w-3/24 ">
          <span className="text-center text-white lg:text-left bg-tic-100 rounded-xl px-2 py-1 text-xxs font-bold">
            {u.statusInscription}
          </span>
        </div>
      )}
    </>
  );
};

const Modal = ({ form, submitForm, updateFormData, queryData, setEditStage }) => {
  return (
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            {/* aquí va un icono */}
            <h2 class="text-xl font-bold py-4 ">
              Ojo! Vas a cambiar un estado
            </h2>
            <p class="text-sm text-gray-500 px-8">
              A continuación escoja el estado de la inscripción que desea asignarle al estudiante: 
            </p>
          </div>
          <form
            className="mx-8 my-5"
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
          >
            <DropDown
              name="stageProject"
              defaultValue={
                queryData && queryData.Inscription.statusInscription
              }
              required={true}
              options={Enum_StatusIncription}
            />

            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button onClick={()=>{setEditStage(false)}} class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancelar
              </button>
              <ButtonLoading nameButton="Guardar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InscriptionsIndex;
