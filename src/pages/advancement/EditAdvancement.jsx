import React, { useEffect } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { EDIT_ADVANCEMENT_BY_ID } from "../../graphql/advancement/mutation";
import { GET_ADVANCEMENT_BY_ID } from "../../graphql/advancement/query";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import useFormData from "../../hook/useFormData";
import Card from "../../components/card/Card";
import Line from "../../components/Line";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import TextArea from "../../components/inputs/TextArea";
import alerts from "../../utils/iziToast/alerts";
import { useNavigate } from "react-router-dom";

const EditAdvancement = () => {
  const nav = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);
  const _id_ = useParams();
  const _id = _id_["_id"];
  const [
    editAdvancement,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_ADVANCEMENT_BY_ID);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_ADVANCEMENT_BY_ID, {
    variables: { _id },
  });

  console.log("datos del query:", queryData);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    editAdvancement({
      variables: {
        _id,
        description: formData.description,
        observations: formData.observations,
      },
    });
    nav('/admin/advancement/index')
  };

  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("Avance modificado correctamente");
      //   redireccionar
    }
  }, [mutationData]);

  useEffect(() => {
    if (queryError) {
      alerts.alertErrorMessage("Error al cambiar este campo del avance");
    }
  }, [queryError]);

  if (queryLoading) {
    return <div>Cargando....</div>;
  }

  console.log("datos:", queryData && queryData);

  return (
    <Card>
      <Header title="Edición de avances" />
      <Line />

      <div className="mx-10">
        <form
          className="mx-8 my-5"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <TextArea
            type="text"
            name="observations"
            required={true}
            label="Observaciones"
          />

          <TextArea
            type="text"
            name="description"
            required={false}
            label="Descripción"
          />

          <ButtonLoading nameButton="Guardar" type="submit" />
        </form>
      </div>
    </Card>
  );
};

export default EditAdvancement;
