import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import { TrashIcon } from '@heroicons/react/24/outline';

const MyAccount: FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(ShoppingCartContext);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      // Navigate to orders after successful payment
      setTimeout(() => {
        navigate('/my-orders');
      }, 2000);
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <Layout>
        <div className="w-full max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300">Redirecting to your orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Checkout</h2>
        
        {/* Cart Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h3>
          <ul className="space-y-4 mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white rounded"
                />
                <div className="flex-1">
                  <p className="font-medium dark:text-white">{item.title}</p>
                  <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold dark:text-white">Total:</span>
              <span className="font-bold dark:text-white">${calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Payment Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="card-name">
                Cardholder Name
              </label>
              <input
                type="text"
                id="card-name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="card-number">
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="expiry">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="cvc">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={paymentStatus === 'processing' || cartItems.length === 0}
            className="w-full mt-6 bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MyAccount; 