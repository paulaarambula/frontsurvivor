import { useQuery } from "@apollo/client";
import React from "react";
import Card from "../../components/card/Card";
import Header from "../../components/Header";
import Line from "../../components/Line";
import Table from "../../components/Tables";
import { GET_ADVANCEMENTS} from '../../graphql/advancement/query'

const AdvancementIndex = () => {
  const { data, error, loading } = useQuery(GET_ADVANCEMENTS);
  const headTitle = ["Tipo", "ID" , "Fecha", "Descripción", "observación"]
  return (
    <Card>
      <Header title="Listado de avances" />
      <Line />
      <Table dataDb={data} subdata={"Advancements"} headTitle={headTitle} path={"advancement"}/>
    </Card>
  )
}

export default AdvancementIndex
