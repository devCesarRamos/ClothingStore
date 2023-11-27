import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define the structure of a product in the cart
export interface Product {
  id: number;
  amount: number;
  price: number;
  title: string;
  image: string;
  category: string;
}

// Define the structure of the CartContext
export interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product, id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  total: number;
}

// Create the CartContext with an initial value of 'undefined'
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define props for the CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // State for managing the cart, item amount, and total
  const [cart, setCart] = useState<Product[]>([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate the total whenever the cart changes
  useEffect(() => {
    const calculatedTotal = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  // Update the item amount whenever the cart changes
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product: Product, id: number) => {
    // Create a new item with an initial amount of 1
    const newItem = { ...product, amount: 1 };
    // Find the item in the cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    // Update the cart based on whether the item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      addToCart(cartItem, id);
    }
  };

  const decreaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem && cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  // Context value containing cart-related information and functions
  const contextValue: CartContextProps = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    total,
  };

  // Provide the context value to its children
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Custom hook to easily access the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;