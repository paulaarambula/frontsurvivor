import React from 'react';
import Card from '../components/card/Card';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/users/queries';
import Table from '../components/Tables';
import Line from '../components/Line';
import TitleCard from '../components/card/TitleCard';

const Example = () => {
    const headTitle = ["#", "Nombre", "Cel", "Mail", "Dirección", "Fecha", "Teléfono", "Fin"];
    const { data, error, loading } = useQuery(GET_USERS);
    console.log("data: ", data);
    return (
        <Card>
            <TitleCard title="Usuarios"/>
            <Line/>
            <Table headTitle={headTitle} dataDb={data} subdata="Users" />
        </Card>
    )
}

export default Example
