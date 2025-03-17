import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Navbar from '../../Components/Navbar';

const mockContextValue = {
  cartItems: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  isItemInCart: jest.fn(),
  isCartOpen: false,
  setIsCartOpen: jest.fn(),
  openCart: jest.fn(),
  closeCart: jest.fn(),
  toggleCart: jest.fn(),
  items: [],
  selectedCategory: 'all',
  setSelectedCategory: jest.fn(),
  isDarkMode: false,
  toggleDarkMode: jest.fn(),
  searchQuery: '',
  setSearchQuery: jest.fn(),
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ShoppingCartContext.Provider value={mockContextValue}>
        {component}
      </ShoppingCartContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  it('renders logo', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText('Shopi')).toBeInTheDocument();
  });

  it('toggles menu on mobile', () => {
    renderWithRouter(<Navbar />);
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    expect(screen.getByPlaceholderText('Search products...')).toBeVisible();
  });

  it('handles category selection', () => {
    renderWithRouter(<Navbar />);
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);
    expect(mockContextValue.setSelectedCategory).toHaveBeenCalledWith('all');
  });

  it('handles search input', () => {
    renderWithRouter(<Navbar />);
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockContextValue.setSearchQuery).toHaveBeenCalledWith('test');
  });
}); 