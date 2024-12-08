import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <img src="/logo1.png" alt="FleetEase Logo" className="w-16 h-16 mx-auto mb-2" />
      <h1 className="text-2xl font-bold">
        Fleet<span className="text-blue-500">Ease</span>
      </h1>
    </div>
  );
};

export default AuthHeader;

