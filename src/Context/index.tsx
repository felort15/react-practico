import { createContext, FC, ReactNode, useState, useContext, useEffect } from 'react'

export interface Product {
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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isItemInCart: () => false,
  isCartOpen: false,
  setIsCartOpen: () => {},
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  items: [],
  selectedCategory: 'all',
  setSelectedCategory: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
})

interface Props {
  children: ReactNode;
}

export const ShoppingCartProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [items, setItems] = useState<Product[]>([])
  const [filteredItems, setFilteredItems] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
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
      const filtered = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredItems(filtered)
    } else {
      const filtered = items.filter(item => 
        item.category === selectedCategory && 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredItems(filtered)
    }
  }, [selectedCategory, items, searchQuery])

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

  const logout = () => {
    localStorage.removeItem('userCredentials')
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    setCartItems([])
    closeCart()
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
        openCart,
        closeCart,
        toggleCart,
        items: filteredItems,
        selectedCategory,
        setSelectedCategory,
        isDarkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}
