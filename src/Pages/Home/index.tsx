import { FC, useEffect, useState } from 'react';
import Layout from '../../Components/Layout/index.tsx';
import Card from '../../Components/Cards/index.tsx';

interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
}

const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setProducts(data);
    }; 
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="fixed top-20 w-full h-[calc(100vh-80px)] overflow-y-auto flex justify-center">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-lg p-4">
          {products.map(product => (
            <Card 
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category.name}
              image={product.images[0]}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;