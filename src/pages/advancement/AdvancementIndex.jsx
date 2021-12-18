import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import ButtonBorder from "../../components/buttons/ButtonBorder";
import CardSmall from "../../components/card/CardSmall";
import Line from "../../components/Line";
import { GET_ADVANCEMENTS } from "../../graphql/advancement/query";
import { GET_ADVANCEMENT_BY_ID } from "../../graphql/advancement/query";
import { editIcon, checkIcon, slashIcon } from "../../utils/icons";
import { EDIT_OBSERVATION, EDIT_DESCRIPTION } from "../../graphql/advancement/mutation";
import { useMutation } from "@apollo/client";
import alerts from "../../utils/iziToast/alerts";
import PrivateComponent from "../../components/PrivateComponents";

const AdvancementIndex = () => {
  const { data, error, loading } = useQuery(GET_ADVANCEMENTS);
  const [editDes, setEditDes] = useState(false);
  console.log("editDes", editDes);
  const [observationInput, setObervationInput] = useState("");
  const [description, setDescriptionInputInput] = useState("");
  let observations = [];
  const [arrayObj, setArrayObj] = useState([]);
  const [_id, setIdAbv] = useState("");
  console.log("idadv", _id);
  // console.log("arrayObj", arrayObj);
  const [
    editObservation,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_OBSERVATION);

  const [
    editDescription,
    { data: mutationDataDes, loading: mutationLoadingDes, error: mutationErrorDes },
  ] = useMutation(EDIT_DESCRIPTION);


  const mutationDescription = (_id) =>{
    editDescription({
      variables: {
        _id,
        description,
      },
    });
  }

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_ADVANCEMENT_BY_ID, {
    variables: { _id },
  });
  console.log("observationInput", observationInput);
  console.log("_id", _id);
  // console.log("queryData", queryData)

  useEffect(() => {
    observations.pop();
    if (queryData !== undefined) {
      queryData.Advancement.observations.map((u) => {
        observations.push(u);
      });
      observations.push(observationInput);

      editObservation({
        variables: {
          _id,
          observations,
        },
      });

      // ii.push(toString(observationInput) )
      console.log("______", observations);
    }
  }, [queryData]);



  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("modificada correctamente");
      // redireccionar
    }
    if (mutationDataDes) {
      alerts.alertSucees("modificada correctamente");
      // redireccionar
    }
  }, [mutationData, mutationDataDes]);

  useEffect(() => {
    if (mutationError) {
      alerts.alertErrorMessage("Error");
    }
    if (mutationErrorDes) {
      alerts.alertErrorMessage("Error");
    }
  }, [mutationError, mutationErrorDes]);

  console.log("data", data);

  return (
    <>
      {data &&
        data.Advancements.map((u) => {
          return (
            <Card>
              <div className="px-8">
                <div className="flex flex-row justify-between">
                  <span className="font-bold text-lg text-gray-75">
                    {u.project.nameProject.toUpperCase()}
                  </span>
                  {!editDes ? <ButtonBorder
                    name="Modificar"
                    set={setEditDes}
                    colorBorder={"border-tic-25"}
                    colorBg={"bg-tic-75"}
                    changeValue={true}
                  />:
                  <ButtonBorder
                  name="Cancelar"
                  set={setEditDes}
                  colorBorder={"border-gray-500"}
                  colorBg={"bg-gray-500"}
                  changeValue={false}
                />
                  }
                 
                  {/* <button onClick={()=>{setEditDes(true)}}>Modificar</button> */}
                </div>

                {!editDes ? (
                  <p className="text-gray-50 mt-2">
                    <span className="font-bold">Avance: </span>
                    {u.description}
                  </p>
                ) : (
                  <>
                  <input
                    type="text"
                    name="observations"
                    required={true}
                    defaultValue={u.description}
                    onChange={(e) => setDescriptionInputInput(e.target.value)}
                    className="w-full focus:outline-none p-2 border border-tic-50 mt-4 rounded-xl"
                  />
                  <button onClick={()=>{mutationDescription(u._id)}}>Guardar</button>
                  </>

                )}

                <div className="flex flex-row justify-end">
                  <span className="text-xs mx-1">
                    <span className="font-bold">Creado por: </span>
                    {u.createdBy.name}
                  </span>{" "}
                  <span className="text-xs mx-1">
                    <span className="font-bold">Fecha: </span>
                    {u.date.slice(0, 10)}
                  </span>
                </div>
              </div>
              <Line />
              <div className="px-8">
                <AddObservation
                  id={u._id}
                  setIdAbv={setIdAbv}
                  setObervationInput={setObervationInput}
                />

                {u.observations.map((p) => {
                  return (
                    <CardSmall>
                      <div className="flex flex-row justify-between">
                        <EditObservation p={p} u={u} />
                      </div>
                    </CardSmall>
                  );
                })}
              </div>
            </Card>
          );
        })}
    </>
  );
};

const AddObservation = ({ id, setIdAbv, setObervationInput }) => {
  const [addObservation, setAddObservation] = useState(false);

  const ejectucar = () => {
    setIdAbv(id);

    //Ehecturar mutacion
  };

  return (
    <>
      <PrivateComponent rolesList={["LIDER"]}>
        <div className="flex flex-row justify-between">
          <span className="text-xs mx-1 font-bold">Observaciones</span>
          {!addObservation ? (
            <ButtonBorder
              name="Agregar"
              set={setAddObservation}
              colorBorder={"border-tic-25"}
              colorBg={"bg-tic-75"}
              changeValue={true}
            />
          ) : (
            <ButtonBorder
              name="Ocultar"
              set={setAddObservation}
              colorBorder={"border-gray-100"}
              colorBg={"bg-gray-400"}
              changeValue={false}
            />
          )}
        </div>
      </PrivateComponent>

      {addObservation ? (
        <>
          <input
            type="text"
            name="observations"
            required={true}
            placeholder="Escriba aquí su observacion..."
            onChange={(e) => setObervationInput(e.target.value)}
            className="w-full focus:outline-none p-2 border border-tic-50 mt-4 rounded-xl"
          />
          <button
            onClick={() => {
              ejectucar();
            }}
          >
            <span>Guardar</span>
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const EditObservation = ({ p, u, setId, _id }) => {
  const [editObservation, setEditObservation] = useState(false);
  const [observationInput, setObervationInput] = useState("");

  const mutation = () => {
    setId(u);
    // editObservation({
    // variables: {
    // _id,
    // observations: formData.observations,
    // },
    // });
  };

  return (
    <>
      {!editObservation ? (
        <>
          <div> {p}</div>
          <div>
            {/* <button onClick={() => {setEditObservation(true)}}>
              {editIcon()}
            </button> */}
          </div>
        </>
      ) : (
        <>
          <span>{}</span>
          <input
            type="text"
            name="observations"
            required={true}
            defaultValue={p}

onChange={(e) => setObervationInput(e.target.value)}
            className="w-full focus:outline-none p-2 border border-tic-50 rounded-xl"
          />

          <div className="flex flex-row">
            <button
              onClick={() => {
                mutation();
              }}
              className="mx-0.5"
            >
              {checkIcon("15", "none", "2")}
            </button>
            <button
              className="mx-0.5"
              onClick={() => {
                setEditObservation(false);
              }}
            >
              {slashIcon("15", "none", "2")}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AdvancementIndex;