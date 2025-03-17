import { createContext, useState, ReactNode, useContext, useEffect } from 'react'

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
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  items: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({} as any)

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [items, setItems] = useState<Product[]>([])
  const [filteredItems, setFilteredItems] = useState<Product[]>([])
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        setFilteredItems(data)
      })
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items)
    } else {
      const filtered = items.filter(item => item.category === selectedCategory)
      setFilteredItems(filtered)
    }
  }, [selectedCategory, items])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const addToCart = (product: Product) => {
    if (!isItemInCart(product.id)) {
      setCartItems(prev => [...prev, product])
      setIsCartOpen(true)
    }
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const isItemInCart = (productId: number): boolean => {
    return cartItems.some(item => item.id === productId)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <ShoppingCartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isItemInCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toggleCart,
        items: filteredItems,
        selectedCategory,
        setSelectedCategory,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}
