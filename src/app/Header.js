import React from 'react';
import Image from 'next/image';
import logoLeft from '../../public/akgecSkillsLogo.jpg';
import logoRight from '../../public/image2.jpg';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      {/* Left Logo */}
      <Image src={logoLeft} alt="Left Logo" width={48} height={48} />

      {/* Right Logo */}
      <Image src={logoRight} alt="Right Logo" width={48} height={48} />
    </div>
  );
};

export default Header;
