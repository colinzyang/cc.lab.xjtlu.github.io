import React from 'react';
import { Hero } from './Hero';
import { RecentPosts } from './RecentPosts';

export const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Hero />
      <RecentPosts />
    </div>
  );
};