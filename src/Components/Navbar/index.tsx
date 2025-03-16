import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { ShoppingCartIcon } from '@heroicons/react/16/solid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, removeFromCart } = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4'

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

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
            to='/mens-clothing'
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
            to='/jewelry'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewelry
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/womens-clothing'
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
        <li className="relative group">
          <div className="flex items-center cursor-pointer">
            <span>🛒</span>
            <span className="ml-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          </div>
          
          {/* Updated Dropdown menu */}
          {cartItems.length > 0 && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl invisible group-hover:visible">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
                <ul className="space-y-3">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center gap-2">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.title}</p>
                        <p className="text-sm font-medium">${item.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar