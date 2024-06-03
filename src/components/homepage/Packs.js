import React from 'react';

const packs = [
  {
    name: 'Prime Plus',
    price: '15 TND',
    period: '/month',
    description: 'For Enterprises',
    features: [
      '3 Social profiles',
      '12 Team members',
      '5 Competitors per profile',
      'Hashtags per profile',
      '12 Team members',
    ],
  },
  {
    name: 'Popular',
    price: '5 TND',
    period: '/month',
    description: 'For Average Consumers',
    features: [
      '6 Social profiles',
      '12 Team members',
      '5 Competitors per profile',
      'Hashtags per profile',
      '12 Team members',
    ],
  },
  {
    name: 'Prime',
    price: '50 TND',
    period: '/month',
    description: 'For Enterprises',
    features: [
      '6 Social profiles',
      '12 Team members',
      '5 Competitors per profile',
      'Hashtags per profile',
      '12 Team members',
    ],
  },
];

const SubscriptionPacks = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl font-bold text-[#4A4550] mb-8">Get the full Consult'ini Experience!</h2>
      <div className="flex space-x-6">
        {packs.map((pack, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-8 w-72 text-center hover:bg-teal-400 hover:text-white transition duration-300"
          >
            <h3 className="text-xl font-bold mb-4">{pack.name}</h3>
            <p className="text-4xl font-bold mb-2">
              <span className="text-gray-600"> {pack.price}</span>
              <span className="text-lg font-medium"> {pack.period}</span>
            </p>
            <p className="text-gray-600 mb-4">{pack.description}</p>
            <ul className="text-left mb-6">
              {pack.features.map((feature, idx) => (
                <li key={idx} className="flex items-center mb-2">
                  <span className="text-teal-600 hover:text-white mr-2">•</span>{feature}
                </li>
              ))}
            </ul>
            <button className="bg-white text-teal-400 px-6 py-2 rounded-full hover:bg-teal-600 hover:text-white transition duration-300">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPacks;
