import { FC, useContext } from 'react';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';

const MyOrders: FC = () => {
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">My Orders</h2>
        
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No orders yet
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <ul className="space-y-4">
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders; 