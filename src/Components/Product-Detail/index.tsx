import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    addToCart, 
    removeFromCart, 
    isItemInCart,
    openCart,
    toggleCart
  } = useContext(ShoppingCartContext);
  const isSelected = product ? isItemInCart(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCartClick = () => {
    if (!product) return;
    
    if (isSelected) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
      openCart();
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto dark:bg-gray-800 dark:text-white">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors"
        title="Close"
      >
        <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </button>
      
      <aside className="md:w-1/2">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-auto object-contain rounded-lg bg-white"
        />
      </aside>
      <main className="md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
            {product.category}
          </span>
          <button
            onClick={handleCartClick}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100'
            }`}
          >
            {isSelected ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
