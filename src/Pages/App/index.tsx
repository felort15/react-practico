import { useRoutes } from 'react-router-dom'
import Layout from '../../Components/Layout/index.tsx'
import Home from '../Home/index.tsx'
import MyAccount from '../MyAccount/index.tsx'
import MyOrder from '../MyOrder/index.tsx'
import MyOrders from '../MyOrders/index.tsx'
import NotFound from '../NotFound/index.tsx'
import SignIn from '../SignIn/index.tsx'
import Navbar from '../../Components/Navbar/index.tsx'
import './App.css'



const routes = [
  { path: '/', element: <Home /> },
  { path: '/my-account', element: <MyAccount /> },
  { path: '/my-order', element: <MyOrder /> },
  { path: '/my-orders', element: <MyOrders /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/*', element: <NotFound /> },
]

function App() {
  return (
    <Layout>
      <Navbar />
      <div className="pt-20">
        {useRoutes(routes)}
      </div>
    </Layout>
  )
}

export default App
