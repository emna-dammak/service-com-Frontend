import React from 'react';
import LandingPage from './LandingPage';
import Categories from './Categories';
import SubscriptionPacks from './Packs';
import Services from './Services';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <LandingPage />
      <SubscriptionPacks />
      <Services />
      <Categories />
      <Footer />
    </div>
  );
};

export default HomePage;
