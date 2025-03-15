import { createContext, useState, ReactNode, useContext } from 'react'

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ShoppingCartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  isItemInCart: (productId: number) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isItemInCart: () => false,
  isCartOpen: false,
  setIsCartOpen: () => {},
})

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product) => {
    if (!isItemInCart(product.id)) {
      setCartItems(prev => [...prev, product])
    }
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const isItemInCart = (productId: number): boolean => {
    return cartItems.some(item => item.id === productId)
  }

  return (
    <ShoppingCartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isItemInCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}
