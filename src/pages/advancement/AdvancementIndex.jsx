import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Card from "../../components/card/Card";
import ButtonBorder from "../../components/buttons/ButtonBorder";
import CardSmall from "../../components/card/CardSmall";
import Line from "../../components/Line";
import { GET_ADVANCEMENTS } from "../../graphql/advancement/query";
import { GET_ADVANCEMENT_BY_ID } from "../../graphql/advancement/query";
import { editIcon, checkIcon, slashIcon } from "../../utils/icons";
import { EDIT_OBSERVATION } from "../../graphql/advancement/mutation";
import { useMutation } from "@apollo/client";

const AdvancementIndex = () => {
  const [
    editObservation,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_OBSERVATION);
  const { data, error, loading } = useQuery(GET_ADVANCEMENTS);
  const [_id, setId] = useState("");
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_ADVANCEMENT_BY_ID, {
    variables: { _id },
  });
  console.log("_id", _id);
  
  return (
    <>
      {data &&
        data.Advancements.map((u) => {
          
          return (
            <Card>
              <div className="px-8">
                <span className="font-bold text-lg text-gray-75">
                  {u.project.nameProject.toUpperCase()}
                </span>
                <p className="text-gray-50 mt-2">
                  <span className="font-bold">Avance: </span>
                  {u.description}
                </p>
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
                <AddObservation />

                {u.observations.map((p) => {
                  return (
                    <CardSmall>
                      <div className="flex flex-row justify-between">
                        <EditObservation p={p} u={u} setId={setId} _id={_id} />
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

const AddObservation = () => {
  const [observationInput, setObervationInput] = useState("");
  const [addObservation, setAddObservation] = useState(false);
  console.log("observationInput", observationInput);
  return (
    <>
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

      {addObservation ? (
        <input
          type="text"
          name="observations"
          required={true}
          placeholder="Escriba aquí su observacion..."
          onChange={(e) => setObervationInput(e.target.value)}
          className="w-full focus:outline-none p-2 border border-tic-50 mt-4 rounded-xl"
        />
      ) : (
        <></>
      )}
    </>
  );
};

const EditObservation = ({ p, u, setId, _id}) => {
  console.log("u", u)
  console.log("p", p)
  
  const [editObservation, setEditObservation] = useState(false);
  const [observationInput, setObervationInput] = useState("");

const mutation = () =>{
  setId(u);
  
  // editObservation({
  //   variables: {
  //     _id,
  //     observations: formData.observations,
  //   },
  // });
}

  return (
    <>
      {!editObservation ? (
        <>
          <div> {p}</div>
          <div>
            <button onClick={() => setEditObservation(true)}>
              {editIcon()}
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            name="observations"
            required={true}
            defaultValue={p}
            onChange={(e) => setObervationInput(e.target.value)}
            className="w-full focus:outline-none p-2 border border-tic-50 rounded-xl"
          />

          <div className="flex flex-row">
            <button onClick={()=>{mutation()}} className="mx-0.5">{checkIcon("15", "none", "2")}</button>
            <button
              className="mx-0.5"
              onClick={() => setEditObservation(false)}
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
