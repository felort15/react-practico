import { useState, useEffect } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Cards'
import axios from 'axios'

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setItems(response.data.slice(0, 20)); // Limit to 20 items
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="fixed top-20 w-full h-[calc(100vh-80px)] flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fixed top-20 w-full h-[calc(100vh-80px)] overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-6 auto-rows-max place-items-center max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-xl">Loading products...</p>
              </div>
            ) : (
              items.map(item => (
                <Card 
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  category={{ name: item.category }}
                  images={[item.image]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home