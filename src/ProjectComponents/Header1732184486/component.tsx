import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 w-full h-full"> {/* Full width and height */}
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="text-2xl font-bold">SofaSelect</div>
        <img src={`https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Sofa_Shopping_App_1732184482/${window.MI_PROJECT_GIT_REF || 'main'}/src/assets/images/3dc7906198c341298ff7b6f6517221eb.jpeg`} alt="Header Image" className="h-8 w-auto" />
      </div>
    </header>
  );
};

export { Header as component };