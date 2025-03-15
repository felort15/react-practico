import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCartContext } from '../../Context';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, isItemInCart } = useContext(ShoppingCartContext);
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
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <aside className="md:w-1/2">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-auto object-contain rounded-lg"
        />
      </aside>
      <main className="md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            {product.category}
          </span>
          <button
            onClick={handleCartClick}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-black text-white hover:bg-gray-800'
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
