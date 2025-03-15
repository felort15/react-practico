import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeStyle = 'underline underline-offset-4'

  return (
    <nav className='flex flex-col md:flex-row justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light bg-white'>
      {/* Logo and menu button */}
      <div className='flex justify-between items-center w-full md:w-auto'>
        <NavLink to='/' className='font-semibold text-lg'>
          Shopi
        </NavLink>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden'
        >
          ☰
        </button>
      </div>

      {/* Navigation Links */}
      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Mens clothingg'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Men's clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/jewerly'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewerly
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/women clothing'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Women's clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>

      {/* User menu */}
      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
        <li className='text-black/60'>
          fakeUser@gmail.com
        </li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Sign In
          </NavLink>
        </li>
        <li>
          🛒 0
        </li>
      </ul>
    </nav>
  )
}

export default Navbar