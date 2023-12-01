import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, Product as ProductType } from '../context/CartContext.tsx';

// Define the props for the Product component
interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  // Access the CartContext to use cart-related functionalities
  const cartContext = useContext(CartContext);

  // If CartContext is not available, return null
  if (!cartContext) {
    return null;
  }

  // Destructure properties from the product
  const { id, image, category, title, price } = product;

  return (
    <Link to={`/product/${id}`}>
      <div className='mb-4 relative overflow-hidden group transition hover:cursor-pointer'>
        {/* Product image container */}
        <div className='h-[500px]'>
          <div className='w-full h-full flex justify-center items-center'>
            {/* Product image */}
            <div className='w-[200px] mx-auto flex justify-center items-center'>
              <img
                className='max-h-[200px] group-hover:scale-150 transition duration-300'
                src={image}
                alt={title}
              />
            </div>
          </div>
        </div>
        {/* Display product category, title, and price */}
        <div>
          <div className='text-sm capitalize text-gray-500 mb-1'>{category}</div>
          <h2 className='font-semibold mb-1'>{title}</h2>
          <div className=''>${price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
