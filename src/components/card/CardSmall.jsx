import React from 'react'

const CardSmall = ({children}) => {
    return (
        <div className="flex flex-col rounded-xl border border-tic-25 px-4 py-4 my-3">
            {children}
        </div>
    )
}

export default CardSmall
