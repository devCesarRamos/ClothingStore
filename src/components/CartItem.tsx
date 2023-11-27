import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { useCart, Product } from '../context/CartContext.tsx';

const CartItem: React.FC<{ item: Product }> = ({ item }) => {
  // Destructure necessary functions from the CartContext
  const { removeFromCart, increaseAmount, decreaseAmount } = useCart();

  // Destructure properties from the item object
  const { id, title, image, price, amount } = item;

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-150 flex items-center gap-x-4'>
        {/* Link to the product details page */}
        <Link to={`/product/${id}`}>
          <img className='max-w-[80px]' src={image} alt='' />
        </Link>
        <div className='w-full flex flex-col'>
          <div className='flex justify-between mb-2'>
            {/* Link to the product details page with title */}
            <Link
              to={`/product/${id}`}
              className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            >
              {title}
            </Link>
            {/* Remove item from the cart on click */}
            <div onClick={() => removeFromCart(id)} className='text-xl cursor-pointer'>
              <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] text-sm'>
            {/* Quantity control with decrease, current amount, and increase buttons */}
            <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
              <div onClick={() => decreaseAmount(id)} className='flex-1 flex justify-center items-center cursor-pointer h-full'>
                <IoMdRemove />
              </div>
              <div className='h-full flex justify-center items-center px-2'>{amount}</div>
              <div onClick={() => increaseAmount(id)} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                <IoMdAdd />
              </div>
            </div>
            {/* Display the price of a single item */}
            <div className='flex-1 flex items-center justify-around'>$ {price}</div>
            {/* Display the total price for the quantity of the item */}
            <div className='flex-1 flex justify-end items-center text-primary font-medium'>
              {`$ ${parseFloat((price * amount).toFixed(2))}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
