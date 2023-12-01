import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from './CartItem.tsx';
import { SidebarContext } from '../context/SidebarContext.tsx';
import { CartContext, Product, CartContextProps } from '../context/CartContext.tsx';

const Sidebar: React.FC = () => {
  // Access the SidebarContext to check if the sidebar is open and to handle closing it
  const { isOpen, handleClose } = useContext(SidebarContext);

  // Access the CartContext to retrieve cart-related information and functions
  const cartContext = useContext(CartContext);

  // Destructure properties and functions from the cartContext or provide default values
  const { cart, clearCart, total, itemAmount } = (cartContext || { cart: [], clearCart: () => {}, total: 0, itemAmount: 0 }) as CartContextProps;

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      }  w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      {/* Header section with shopping bag title and close icon */}
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>
          Shopping Bag ({itemAmount})
        </div>
        {/* Close icon */}
        <div
          onClick={handleClose}
          className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl text-gray-500 hover:text-black transition' />
        </div>
      </div>
      {/* Cart items section */}
      <div className='flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b'>
        {/* Map through cart items and render CartItem component for each */}
        {cart.map((item: Product) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      {/* Footer section with total, clear cart button, and links for view cart and checkout */}
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        {/* Display total and clear cart button */}
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span>${total.toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className='cursor-pointer py-4 text-black w-12 h-12 flex justify-center items-center text-xl lg:rounded-lg hover:text-red-500 transition'>
            <FiTrash2 />
          </div>
        </div>
        {/* Link to checkout */}
        <Link
          to={'/'}
          className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium lg:rounded-lg'>
          Go To Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
