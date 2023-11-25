import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProductDetails from './pages/ProductDetails.tsx'
import Sidebar from './components/Sidebar.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'


const App: React.FC = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
};


export default App;
