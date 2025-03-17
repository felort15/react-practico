import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../Context';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Cards';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'electronics',
  description: 'Test description',
  image: 'test.jpg'
};

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ShoppingCartProvider>
        {component}
      </ShoppingCartProvider>
    </BrowserRouter>
  );
};

describe('Shopping Cart Integration', () => {
  it('adds product to cart and updates cart count', () => {
    renderWithProvider(
      <>
        <Navbar />
        <Card data={mockProduct} />
      </>
    );

    // Find and click add to cart button
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Check if cart count is updated
    const cartCount = screen.getByText('1');
    expect(cartCount).toBeInTheDocument();
  });

  it('shows cart dropdown with correct total', () => {
    renderWithProvider(
      <>
        <Navbar />
        <Card data={mockProduct} />
      </>
    );

    // Add product to cart
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Open cart dropdown
    const cartButton = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartButton);

    // Check if product details are shown
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('removes product from cart', () => {
    renderWithProvider(
      <>
        <Navbar />
        <Card data={mockProduct} />
      </>
    );

    // Add and then remove product
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    
    const cartButton = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartButton);

    const removeButton = screen.getByTitle('Remove item');
    fireEvent.click(removeButton);

    // Check if cart is empty
    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
  });
}); 