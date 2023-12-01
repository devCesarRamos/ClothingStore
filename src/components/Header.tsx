import React, { useContext, useEffect, useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext, CartContextProps } from '../context/CartContext';

const Header: React.FC = () => {
  // State to track whether the header is active based on scroll position
  const [isActive, setIsActive] = useState(false);

  // Sidebar context to handle opening and closing of the sidebar
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  // Cart context to retrieve the total number of items in the cart
  const cartContext = useContext(CartContext) as CartContextProps | undefined;

  // Effect to update the header's active state based on scroll position
  useEffect(() => {
    window.addEventListener('scroll', () => {
      // Update isActive based on scroll position
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', () => {
        setIsActive(false);
      });
    };
  }, []);

  // Retrieve the total number of items in the cart or default to 0
  const itemAmount = cartContext?.itemAmount || 0;

  return (
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Link to the home page with the logo */}
        <Link to="/">
          <div>
            <img className="w-[40px]" src={Logo} alt="Homepage" />
          </div>
        </Link>
        {/* Bag icon to open the sidebar and display the total number of items in the cart */}
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex relative">
          <BsBag className="text-2xl" />
          {/* Display the total number of items in the cart with a red badge */}
          <div className="bg-primary absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;