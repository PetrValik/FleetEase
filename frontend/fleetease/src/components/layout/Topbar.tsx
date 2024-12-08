import React from 'react';
import { useUser } from '../../contexts/UserContext';
import TopbarLogo from './TopbarLogo';
import TopbarUserMenu from './TopbarUserMenu';
import TopbarAuthButtons from './TopbarAuthButtons';

const Topbar: React.FC = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="h-20 bg-[#001529] text-white px-8 flex items-center justify-between border-b border-white/10 w-full flex-shrink-0">
      <TopbarLogo />
      {isAuthenticated ? <TopbarUserMenu /> : <TopbarAuthButtons />}
    </div>
  );
};

export default Topbar;

