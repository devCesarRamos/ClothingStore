import React from 'react';
import WomanImg from '../assets/woman_hero.png';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className="container mx-auto flex justify-around h-full">
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-primary mr-3'></div>New Trend
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            WOMEN  <br />
            <span className='font-semibold'>AUTUMN SALE</span>
          </h1>
          <Link 
            to={'/'} 
            className='self-start uppercase font-semibold border-b-2 border-primary'
          >
            Discover More
          </Link>
        </div>
        {/* Section with an image (visible only on larger screens) */}
        <div className='hidden lg:block'>
          <img src={WomanImg} alt="WomanImg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;