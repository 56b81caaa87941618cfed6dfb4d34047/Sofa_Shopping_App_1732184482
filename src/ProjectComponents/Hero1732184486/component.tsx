import React from 'react';

const Hero: React.FC = () => {
  
  return (
    <div className="bg-black py-16 text-white w-full h-full bg-cover bg-center" style={{backgroundImage: 'url(https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Sofa_Shopping_App_1732184482/main/src/assets/images/2a813d12798c438696b709dbf04c2008.jpeg)'}}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Sofa</h1>
          <p className="text-xl mb-6">Discover comfort and style with our curated collection of sofas for every home</p>
        </div>
      </div>
    </div>
  );
};

export { Hero as component }