import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Cards'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const { items } = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[1200px] place-items-center">
          {items?.map(item => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home