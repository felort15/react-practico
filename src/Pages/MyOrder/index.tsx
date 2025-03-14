import { FC } from 'react';
import Layout from '../../Components/Layout/index.tsx';

const MyOrder: FC = () => {
  return (
    <Layout>
      <div className="w-full flex items-center justify-center pt-20">
        <h1>My Order</h1>
      </div>
    </Layout>
  );
};

export default MyOrder;