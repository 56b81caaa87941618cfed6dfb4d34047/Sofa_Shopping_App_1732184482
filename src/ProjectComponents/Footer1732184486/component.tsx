import React from 'react';
import tt from './tt.jpeg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${tt})`}}>
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="flex flex-wrap justify-between h-full">

          {/* FOOTER COPY */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">SofaSelect</h3>
            <p className="text-gray-400">© 2023 SofaSelect. Comfort delivered to your doorstep.</p>
          </div>

          {/* SOCIALS */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>

          {/* FOOTER IMAGE */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img src={`https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Sofa_Shopping_App_1732184482/${window.MI_PROJECT_GIT_REF || 'main'}/src/assets/images/3dc7906198c341298ff7b6f6517221eb.jpeg`} alt="Footer Image" className="w-full h-auto rounded-lg shadow-md" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export { Footer as component };