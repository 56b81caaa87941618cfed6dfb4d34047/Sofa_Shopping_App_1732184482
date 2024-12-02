import React from 'react';
import tt from './tt.jpeg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${tt})`}}>
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="flex flex-wrap justify-between h-full">

          {/* FOOTER COPY */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
          {/* FOOTER COPY */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">SofaSelect</h3>
            <p className="text-gray-400">© 2023 SofaSelect. Comfort delivered to your doorstep.</p>
          </div>


          {/* SOCIALS */}
          {/* SOCIALS */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export { Footer as component };