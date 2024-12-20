import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-center items-center gap-3 bg-black text-white text-lg p-[25px_0px]'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact'>Contact</Link> 
    </div>
  )
}

export default Header
