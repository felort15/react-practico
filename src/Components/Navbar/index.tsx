import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
    cartItems, 
    removeFromCart, 
    isCartOpen, 
    toggleCart,
    selectedCategory,
    setSelectedCategory 
  } = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4'
  const navigate = useNavigate();

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    toggleCart();
    navigate('/my-account');
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate('/');
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
          <button
            onClick={() => handleCategoryClick('all')}
            className={`${selectedCategory === 'all' ? activeStyle : ''} hover:underline`}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("men's clothing")}
            className={`${selectedCategory === "men's clothing" ? activeStyle : ''} hover:underline`}
          >
            Men's Clothing
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick("women's clothing")}
            className={`${selectedCategory === "women's clothing" ? activeStyle : ''} hover:underline`}
          >
            Women's Clothing
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick('electronics')}
            className={`${selectedCategory === 'electronics' ? activeStyle : ''} hover:underline`}
          >
            Electronics
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick('jewelery')}
            className={`${selectedCategory === 'jewelery' ? activeStyle : ''} hover:underline`}
          >
            Jewelery
          </button>
        </li>
      </ul>

      {/* User menu */}
      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
        <li className='text-black/60'>
          fakeUser@gmail.com
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
        <li className="relative">
          <button 
            onClick={toggleCart}
            className="flex items-center cursor-pointer"
          >
            <span>🛒</span>
            <span className="ml-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          </button>
          
          {/* Dropdown menu */}
          {isCartOpen && cartItems.length > 0 && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Cart Items</h3>
                  <button 
                    onClick={toggleCart}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <ul className="space-y-3 max-h-60 overflow-y-auto">
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
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">${calculateTotal()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar