import React, { useContext } from 'react';
import { ProductContext, Product } from '../context/ProductContext';
import ProductComponent from '../components/Product';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  // Access the ProductContext to get the list of products
  const { products } = useContext(ProductContext) ?? { products: [] };

  // Filter products based on categories (men's clothing or women's clothing)
  const filteredProducts: Product[] = products.filter((item) => {
    return item.category === "men's clothing" || item.category === "women's clothing";
  });

  return (
    <div>
      {/* Display the Hero component */}
      <Hero />
      {/* Display a section with a grid of products */}
      <section className='py-16'>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {/* Map through filtered products and render ProductComponent for each */}
            {filteredProducts.map((product) => {
              return <ProductComponent product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
