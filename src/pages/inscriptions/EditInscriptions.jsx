import React, {useEffect} from "react";
import Card from "../../components/card/Card";
import Header from "../../components/Header";
import Line from "../../components/Line";
import DropDown from "../../components/DropDown";
import { GET_INSCRIPTIONS_BY_ID } from "../../graphql/incriptions/query";
import { EDIT_INSCRIPTION_BY_ID } from "../../graphql/incriptions/mutation";
import { useQuery } from "@apollo/client";
import { Enum_StatusIncription } from "../../utils/enum";
import useFormData from "../../hook/useFormData";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import alerts from "../../utils/iziToast/alerts";

const EditInscriptions = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const _id_ = useParams();
  const _id = _id_["_id"];
  const [
    editInscription,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_INSCRIPTION_BY_ID);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPTIONS_BY_ID, {
    variables: { _id },
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    editInscription({
      variables: {
        _id,
        statusInscription: formData.stageProject,
      },
    });
  };


  useEffect(() => {
    if (mutationData) {
      alerts.alertSucees("Inscripción modificada correctamente");
      //   redireccionar
    }
  }, [mutationData]);

  useEffect(() => {
    if (queryError) {
      alerts.alertErrorMessage("Error al cambiar el estado de la inscripcioón");
    }
    
  }, [queryError]);

  if (queryLoading) {
    return <div>Cargando....</div>;
  }

  console.log("_id: ", queryData && queryData.Inscription.statusInscription);
  return (
    <Card>
      <Header title="Edición de inscripciones" />
      <Line />
      <div className="mx-10">
        <form
          className="mx-8 my-5"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <DropDown
            label="Estado"
            name="stageProject"
            defaultValue={queryData && queryData.Inscription.statusInscription}
            required={true}
            options={Enum_StatusIncription}
          />

          <ButtonLoading nameButton="Guardar" type="submit" />
        </form>
      </div>
    </Card>
  );
};

export default EditInscriptions;
