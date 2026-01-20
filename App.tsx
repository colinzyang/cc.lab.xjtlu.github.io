import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecentPosts } from './components/RecentPosts';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-12 lg:py-20">
        <Hero />
        <RecentPosts />
      </main>
      <Footer />
    </div>
  );
};

export default App;