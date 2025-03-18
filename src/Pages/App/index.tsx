import { useRoutes } from 'react-router-dom'
import Home from '../Home/index.tsx'
import MyAccount from '../MyAccount/index.tsx'
import MyOrders from '../MyOrders/index.tsx'
import NotFound from '../NotFound/index.tsx'
import SignIn from '../SignIn/index.tsx'
import Register from '../Register/index.tsx'
import Checkout from '../Checkout/index.tsx'
import Navbar from '../../Components/Navbar/index.tsx'
import { ShoppingCartProvider } from '../../Context/index.tsx'
import ProductDetail from '../../Components/Product-Detail/index.tsx'
import Footer from '../../Components/Footer/index.tsx'
import './App.css'

const AppRoutes = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/register', element: <Register /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/*', element: <NotFound /> },
    { path: '/product/:id', element: <ProductDetail /> },
  ]

  return useRoutes(routes)
}

function App() {
  return (
    <ShoppingCartProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="flex-grow pt-[68px] px-4 dark:bg-gray-900">
          <div className="max-w-screen-xl mx-auto py-8">
            <AppRoutes />
          </div>
        </div>
        <Footer />
      </div>
    </ShoppingCartProvider>
  )
}

export default App
