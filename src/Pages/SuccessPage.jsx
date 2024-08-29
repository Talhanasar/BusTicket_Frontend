import React from 'react'
import { NavLink } from 'react-router-dom'

const SuccessPage = () => {
  return (
    <div className='h-lvh w-lvw flex justify-center items-center bg-[#f7f8f8]'>
      <div className="w-[50vw] bg-white rounded-lg shadow-lg flex items-center justify-center text-center p-6 flex-col gap-5">
        <img src="/images/success.png" alt="tick mark" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-600">Your bus booking was successful. Thank you for choosing our service!</p>
          <NavLink to="/"><button className="bg-blue-500 text-white py-2 px-5 rounded my-4">Back to home</button></NavLink>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
