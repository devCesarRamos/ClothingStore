import React, { useContext, useState } from 'react';
import { ProductContext, Product } from '../context/ProductContext';
import ProductComponent from '../components/Product';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  // Access the ProductContext to get the list of products
  const { products } = useContext(ProductContext) ?? { products: [] };
  // State for filtering, sorting, and searching
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Filter products based on selected category, sorting option, and search query
  const filteredProducts: Product[] = products
    .filter((item) => (selectedCategory ? item.category === selectedCategory : true))
    .filter((item) => !item.category.includes('electronics')) // Exclude "electronics"
    .filter(
      (item) =>
        item.category === "men's clothing" ||
        item.category === "women's clothing" ||
        item.category === "jewelery"
    )
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Sort products based on selected sorting option
  const sortedProducts: Product[] = selectedSort === 'price-high-low'
    ? [...filteredProducts].sort((a, b) => b.price - a.price)
    : selectedSort === 'price-low-high'
    ? [...filteredProducts].sort((a, b) => a.price - b.price)
    : filteredProducts;

    return (
      <div>
        {/* Display the Hero component */}
        <Hero />
        {/* Filter, Sort dropdown menus and Search bar */}
        <div className='flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 my-4'>
          {/* Search input */}
          <input
            type='text'
            placeholder='Search'
            className='border border-black py-2 px-4 rounded-md md:mx-2 hover:cursor-text'
            onChange={(e) => handleSearchChange(e.target.value)}
            value={searchQuery}
          />
          {/* Filter dropdown menu */}
          <label htmlFor='category' className='sr-only'>
            Filter by category
          </label>
          <select
            id='category'
            name='category'
            className='filter-dropdown border border-black font-semibold py-2 px-4 rounded-md md:mx-2 hover:cursor-pointer'
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory || ''}
          >
            <option value=''>All Filters</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelery</option>
          </select>
          {/* Sort dropdown menu */}
          <label htmlFor='sort' className='sr-only'>
            Sort by
          </label>
          <select
            id='sort'
            name='sort'
            className='filter-dropdown border border-black font-semibold py-2 px-4 rounded-md md:mx-2 hover:cursor-pointer'
            onChange={(e) => handleSortChange(e.target.value)}
            value={selectedSort}
          >
            <option value=''>Sort by default</option>
            <option value='price-high-low'>Price: high to low</option>
            <option value='price-low-high'>Price: low to high</option>
          </select>
        </div> 
        {/* Display a section with a grid of products */}
        <section className='py-16'>
          <div className="container mx-auto">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {/* Map through sorted products and render ProductComponent for each */}
              {sortedProducts.map((product) => {
                return <ProductComponent product={product} key={product.id} />;
              })}
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Home;