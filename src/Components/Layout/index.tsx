import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full dark:bg-gray-900 transition-colors duration-200">
      {children}
    </div>
  );
};

export default Layout;