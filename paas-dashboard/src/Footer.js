import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-6 md:mb-0">
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© 2025 CloudOps. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;