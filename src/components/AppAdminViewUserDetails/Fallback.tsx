import React from 'react';
import { T } from '../ui/Typography';

const Fallback: React.FC = () => {
  return (
    <div className="flex space-x-2 items-center">
      <div className="rounded-full border border-slate-200 h-6 w-6 animate-pulse"></div>
      <div className="bg-gray-200 animate-pulse h-6 w-32"></div>
    </div>
  );
};

export { Fallback };
