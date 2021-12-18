import React from 'react'
import { GET_ADVANCEMENTS } from '../../graphql/advancement/query'
import { useQuery } from '@apollo/client';



const Hh = () => {
    const { data, error, loading } = useQuery(GET_ADVANCEMENTS);
    console.log("data", data)
    return (
        <div>
            hola
        </div>
    )
}

export default Hh
