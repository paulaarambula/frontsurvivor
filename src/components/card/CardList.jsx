import React from 'react'

const CardList = ({children}) => {
    return (
        <div class="w-full mt-2 h-full">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-1 shadow-md rounded-xl p-8 text-gray-75 ">
          {children}
        </div>
      </div>
    )
}

export default CardList
