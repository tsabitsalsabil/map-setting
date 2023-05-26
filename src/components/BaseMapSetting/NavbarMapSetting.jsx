import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBaseMap from './NavBaseMap';

function NavbarMapSetting() {
  const location = useLocation();
  const [subNav] = useState([
    {
      navName: 'Map List',
      href: '/',
      isActive: true,
    },
    {
      navName: 'Add Map',
      href: '/add-map',
      isActive: false,
    },
  ]);
  return (
    <section className=" mt-10">
      <nav className="flex items-center gap-8">
        {subNav.map((subnav) => {
          if (location.pathname === `/map-setting${subnav.href}`) {
            subnav.isActive = true;
          } else {
            subnav.isActive = false;
          }
          return (
            <NavBaseMap
              navName={subnav.navName}
              href={subnav.href}
              isActive={subnav.isActive}
              key={subnav.href}
            />
          );
        })}
      </nav>
      <hr className="text-black" />
    </section>
  );
}

export default NavbarMapSetting;
