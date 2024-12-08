import React from 'react'

const navbar = () => {
  return (
    <nav className="flex justify-between bg-blue-900 text-white py-2">
        <div className="logo">
          <span className="font-bold text-xl mx-10">iTask</span>
        </div>
      <ul className="flex gap-7 mx-10">
        <li className=" cursor-pointer hover:font-bold transition-all duration-75">Home</li>
        <li className=" cursor-pointer hover:font-bold transition-all duration-75">About</li>
      </ul>
    </nav>
  )
}

export default navbar
