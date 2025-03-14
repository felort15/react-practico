import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
      <div className='flex flex-col items-center min-h-screen w-full bg-gray-400 '>
        {children}
      </div>
    )
  }
  
  export default Layout