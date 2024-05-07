import React from 'react';

const categories = [
  { name: 'Baby Sitting', serviceCount: 56, icon: 'Baby.png' },
  { name: 'Plumbing', serviceCount: 112, icon: 'Plumbing.png' },
  { name: 'H.A. Repair', serviceCount: 28, icon: 'Repair.png' },
  { name: 'Gardening', serviceCount: 22, icon: 'Gardening.png' },
  { name: 'House Keeping', serviceCount: 24, icon: 'House.png' },
  { name: 'Electricity', serviceCount: 27, icon: 'Electricity.png' },
];

const BrowseByCategory = () => {
  return (
    <div className="bg-gray w-1128  p-30 grid grid-cols-1 gap-9 " style={{ borderRadius: "5px", backgroundColor: 'rgba(75, 70, 92, 0.02)' ,boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)'}}>
      <h3 className=" text-2xl text-gray-600  font-semibold text-center mt-8 " >
        Browse By Category</h3>

      <div className="grid grid-cols-3 gap-8 ml-10 mr-10 mb-8">
        {categories.map((category, index) => (
         <div key={index} className="w-305.33  p-7 bg-white rounded-lg shadow-md">
         <div className="flex items-center">
           <img src={category.icon} alt="Category Icon" className="w-8 h-8 mr-4" />
           <h5 className="text-lg text-gray-600 font-semibold">{category.name}</h5>
         </div>
         <div>
             <p className="mt-5 text-gray-500 font-semibold">{category.serviceCount} Services</p>
           </div>
       </div>
 
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
