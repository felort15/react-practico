import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/index.tsx';
import { ShoppingCartContext } from '../../Context';

const MyAccount: FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(ShoppingCartContext);
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
        <div className="w-full max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-600">Redirecting to your orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto mt-20 p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-bold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{16}"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{3,4}"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="123"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={paymentStatus === 'processing'}
                className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
                  paymentStatus === 'processing'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {paymentStatus === 'processing' ? 'Processing...' : `Pay $${calculateTotal()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount; 