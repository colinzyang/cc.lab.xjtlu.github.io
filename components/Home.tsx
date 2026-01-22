import React from 'react';
import { Hero } from './Hero';
import { RecentPosts } from './RecentPosts';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';

export const Home: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    // 首页不显示面包屑
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <div className="w-full flex flex-col gap-8">
      <Hero />
      <RecentPosts />
    </div>
  );
};