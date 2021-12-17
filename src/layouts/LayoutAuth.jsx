import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutAuth = () => {
    return (
        <div className="flex justify-center bg-cover bg-center h-screen items-center aling-center font-nunito" style={{backgroundImage: 'url("https://gogo-react.coloredstrategies.com/static/media/balloon-lg.c94920d9.jpg")'}}>
            <div className="text-xs text-gray-50">
                <Outlet/>
            </div>
            
        </div>
    )
}

export default LayoutAuth
