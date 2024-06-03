import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col items-center justify-center text-white rounded-br-full">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center w-full p-6 bg-gradient-bg shadow-md z-50">
        <div className="text-2xl font-bold">Service'Com</div>
        <nav className="flex space-x-8">
          <a href="#" className="hover:underline">Partnership</a>
          <a href="#" className="hover:underline">Solution</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">About Us</a>
        </nav>
        <button className="bg-white text-teal-400 px-4 py-2 rounded-full hover:bg-gray-200 hover:text-teal-600 ">Signup</button>
      </header>

      <main className="flex flex-col items-center text-center mt-24">
        <h1 className="text-6xl font-bold mb-10">
          <span className="block">The First Tunisian Platform</span>
          <span className="block">For Household Services</span>
        </h1>
        <p className="text-lg mb-12">
          Seamless Assistance, Expert Consulting, and Easy Booking for All Your Household Needs
        </p>
        
        <div className="flex items-center bg-white rounded-full p-2 shadow-lg mb-10">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 w-64 text-teal-600 outline-none rounded-l-full"
          />
          <button className="bg-[#63C474] text-white px-4 py-2 rounded-r-full">Start for free</button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
