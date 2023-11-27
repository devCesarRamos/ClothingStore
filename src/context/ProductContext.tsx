import React, { createContext, ReactNode, useState, useEffect } from 'react';

// Define the structure of a product
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number;
}

// Define the structure of the ProductContext
export interface ProductContextProps {
  products: Product[];
}

// Create the ProductContext with an initial value of 'undefined'
export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  // State for managing the list of products
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from an API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch product data from the API
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // Update the state with the fetched products
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // Run the effect only on component mount

  // Context value containing the list of products
  const contextValue: ProductContextProps = {
    products,
  };

  // Provide the context value to its children
  return (
    <ProductContext.Provider value={contextValue as ProductContextProps}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;