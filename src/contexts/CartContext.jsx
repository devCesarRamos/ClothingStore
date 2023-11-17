import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext()

const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product, id) => {
    const newItem = {...product, amount: 1 }
    console.log(product)
    console.log(`${product.title} added to the cart`)
  }
  return (
  <CartContext.Provider value={{addToCart}}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
