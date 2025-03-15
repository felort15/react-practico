import { FC, useState, useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import ErrorBoundary from '../ErrorBoundary';

interface CardProps {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
  description: string;
}

const CardContent: FC<CardProps> = ({ id, title, price, category, images, description }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart, removeFromCart, isItemInCart } = useContext(ShoppingCartContext);
  const isSelected = isItemInCart(id);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isSelected) {
      removeFromCart(id);
    } else {
      addToCart({
        id,
        title,
        price,
        category: category.name,
        description,
        image: images[0]
      });
    }
  };

  return (
    <div className='bg-white cursor-pointer w-full max-w-[280px] h-[360px] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          {category?.name || 'Unknown'}
        </span>
        <img 
          className='w-full h-full object-cover rounded-t-lg' 
          src={imgError ? `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(title)}` : images[0]} 
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
        <button 
          className={`absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 transition-colors duration-300 ${
            isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-white hover:bg-gray-100'
          }`}
          onClick={handleCartClick}
          title={isSelected ? 'Remove from cart' : 'Add to cart'}
        >
          {isSelected ? '✓' : '🛒'}
        </button>
      </figure>
      <div className='px-4 py-2'>
        <p className='flex justify-between items-center'>
          <span className='text-sm font-light truncate flex-1 mr-2'>{title}</span>
          <span className='text-lg font-medium whitespace-nowrap'>${price}</span>
        </p>
      </div>
    </div>
  );
};

const Card: FC<CardProps> = (props) => {
  return (
    <ErrorBoundary>
      <CardContent {...props} />
    </ErrorBoundary>
  );
};

export default Card;