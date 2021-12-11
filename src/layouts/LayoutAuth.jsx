import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutAuth = () => {
    return (
        <div className="flex flex-col bg-gray-50 h-screen p-4 items-center aling-center">
            <div className="h-full w-1/3 pt-20 text-xs text-gray-50">
                <Outlet/>
            </div>
            
        </div>
    )
}

export default LayoutAuth
