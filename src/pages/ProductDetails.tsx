import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';

const ProductDetails: React.FC = () => {
  // Extract the 'id' parameter from the route
  const { id } = useParams<{ id?: string }>();

  // Access the ProductContext and CartContext
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);

  // If either context is not available, show a loading message
  if (!productContext || !cartContext) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  // Extract necessary data and functions from the contexts
  const { products } = productContext;
  const { addToCart } = cartContext;

  // Find the product with the specified 'id'
  const product = id
    ? products.find((item) => item.id === parseInt(id, 10))
    : undefined;

  // If the product is not found, show a loading message
  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  // Extract product details
  const { title, price, description, image } = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row items-center'>
          {/* Display product image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt="" />
          </div>
          {/* Display product details and add to cart button */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
              {title}
            </h1>
            <div className='text-xl text-red-500 font-medium mb-6'>
              $ {price}
            </div>
            <p className='mb-8'>{description}</p>
            <button 
              onClick={() => addToCart(product, product.id)} 
              className='bg-primary py-4 px-8 text-white'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
