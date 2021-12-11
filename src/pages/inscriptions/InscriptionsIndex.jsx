import React from 'react'
import Card from '../../components/card/Card'
import Header from '../../components/Header'
import Line from '../../components/Line'
import Table from '../../components/Tables'
import { GET_INSCRIPTIONS } from '../../graphql/incriptions/query'
import { useQuery } from '@apollo/client'

const InscriptionsIndex = () => {
    const { data, error, loading } = useQuery(GET_INSCRIPTIONS);
    const headTitle = ["a", "Estado", "Fecha de Inicio", "Fecha de Fin"]
    console.log("data: ", data)
    return (
        <Card>
            <Header title="Listado de inscripciones"/>
            <Line/>
            <Table dataDb={data} subdata={"Inscriptions"} headTitle={headTitle}  path={"inscriptions"}/>
        </Card>
    )
}

export default InscriptionsIndex
