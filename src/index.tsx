import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ProductProvider from './context/ProductContext.tsx';
import SidebarProvider from './context/SidebarContext.tsx';
import CartProvider from './context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SidebarProvider>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </SidebarProvider>
  </React.StrictMode>
);