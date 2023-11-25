import React, { createContext, ReactNode, useState, useEffect } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number;
}

export interface ProductContextProps {
  products: Product[];
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const contextValue: ProductContextProps = {
    products,
  };

  return (
    <ProductContext.Provider value={contextValue as ProductContextProps}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;