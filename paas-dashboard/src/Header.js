import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <nav className="flex justify-between items-center container mx-auto">
        <div className="text-2xl font-bold">CloudOps</div>
        <ul className="flex space-x-6">
          <li><a href="#features" className="hover:text-blue-400">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-blue-400">How It Works</a></li>
          <li><a href="#testimonials" className="hover:text-blue-400">Testimonials</a></li>
          <li><a href="#deploy" className="hover:text-blue-400">Deploy Now</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;