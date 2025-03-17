import { FC, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import ErrorBoundary from '../ErrorBoundary';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CardProps {
  data: Product;
}

const CardContent: FC<CardProps> = ({ data }) => {
  const { 
    addToCart, 
    removeFromCart, 
    isItemInCart 
  } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleCardClick = () => {
    navigate(`/product/${data.id}`);
  };

  const handleCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isItemInCart(data.id)) {
      removeFromCart(data.id);
    } else {
      addToCart(data);
    }
  };

  const isSelected = isItemInCart(data.id);

  return (
    <div 
      onClick={handleCardClick}
      className="w-full max-w-[280px] bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <figure className="relative w-full h-[280px] p-4">
        <img 
          className="w-full h-full object-contain rounded-lg bg-white" 
          src={imgError ? `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(data.title)}` : data.image} 
          alt={data.title}
          onError={handleImageError}
          loading="lazy"
        />
        <button
          onClick={handleCartClick}
          className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-white text-black hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
        >
          {isSelected ? '✓' : <ShoppingCartIcon className="w-5 h-5" />}
        </button>
        <span className="absolute bottom-6 left-6 bg-white/80 dark:bg-gray-700/80 rounded-full px-3 py-1 text-xs text-black dark:text-white">
          {data.category}
        </span>
      </figure>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10 dark:text-white">
          {data.title}
        </h3>
        <p className="text-lg font-bold dark:text-white">
          ${data.price}
        </p>
      </div>
    </div>
  );
};

const Card: FC<CardProps> = ({ data }) => {
  return (
    <ErrorBoundary>
      <CardContent data={data} />
    </ErrorBoundary>
  );
};

export default Card;