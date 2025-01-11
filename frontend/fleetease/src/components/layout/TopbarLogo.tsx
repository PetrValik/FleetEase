import React from 'react';

const TopbarLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4 min-w-0">
      <img src="/logo1.png" alt="FleetEase" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
      <h1 className="text-lg md:text-2xl font-semibold truncate">
        Fleet<span className="text-blue-500">Ease</span>
      </h1>
    </div>
  );
};

export default TopbarLogo;

