import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-400 text-white py-2 w-full bottom-0 left-0 mt-6">
      <div className="container mx-auto text-center">

        <p>© {new Date().getFullYear()} Service'Com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
