import React from 'react';

const Footer = () => {
  // Project color theme
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  return (
    <footer className="py-8" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2" style={{ color: colors.dark }}>
            © {new Date().getFullYear()} LifeBlood Donation Network
          </p>
          <p style={{ color: colors.primary }}>
            Saving lives, one donation at a time. Join our mission today.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;