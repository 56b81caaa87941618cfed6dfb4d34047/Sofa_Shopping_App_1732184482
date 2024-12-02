import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 w-full h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-wrap justify-between h-full">
          
          {/* FOOTER COPY */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">SofaSelect</h3>
            <p className="text-gray-400">© 2023 SofaSelect. Comfort delivered to your doorstep.</p>
          </div>

          {/* SOCIALS */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>

          {/* FOOTER IMAGE */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img src="https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Sofa_Shopping_App_1732184482/main/src/assets/images/2a813d12798c438696b709dbf04c2008.jpeg" alt="Footer Image" className="w-full h-auto rounded-lg shadow-md" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export { Footer as component };