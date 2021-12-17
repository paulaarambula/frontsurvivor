import React from 'react'

const TitleAndNavegation = ({title, items}) => {
    return (
        <div className="flex flex-row items-end">
            <span className="text-2xl items-end mr-6 text-gray-100">{title}</span>
            <div className="flex flex-row text-xs list-none pb-0.5 divide-x divide-gray-400">
                {items && items.map((u)=>{
                    return <li className="px-2">{u}</li>
                })}
            </div>
          </div>
    )
}

export default TitleAndNavegation
