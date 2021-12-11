import { useUser } from '../context/user';
import React from 'react'

const PrivateComponent = ({rolesList, children}) => {
    
    const {userData} = useUser();
    if(rolesList.includes(userData.rol)){
        return children;
    }
    return <></>
}

export default PrivateComponent
