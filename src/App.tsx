import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider } from './Context'
import Home from './Pages/Home'
import MyAccount from './Pages/MyAccount'
import MyOrders from './Pages/MyOrders'
import SignIn from './Pages/SignIn'
import Register from './Pages/Register'
import ProductDetail from './Components/Product-Detail'
import NotFound from './Pages/NotFound'

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/privacy-policy" element={<NotFound />} />
          <Route path="/terms-of-service" element={<NotFound />} />
          <Route path="/faq" element={<NotFound />} />
          <Route path="/support" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App 