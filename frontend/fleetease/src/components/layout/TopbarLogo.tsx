import React from 'react';

const TopbarLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <img src="/logo1.png" alt="FleetEase" className="w-12 h-12 object-contain" />
      <h1 className="text-2xl font-semibold">
        Fleet<span className="text-blue-500">Ease</span>
      </h1>
    </div>
  );
};

export default TopbarLogo;

