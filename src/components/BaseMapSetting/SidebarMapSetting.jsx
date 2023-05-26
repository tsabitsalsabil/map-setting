import React, { useState } from 'react';
import { BsMap } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function SideBarMapSetting() {
  const [isActive, setIsActive] = useState([
    {
      name: 'firstNavigation',
      value: true,
      href: '/map-setting',
    },
    {
      name: 'secondNavigation',
      value: false,
      // href: link ke layer management
    },
    {
      name: 'thirdNavigation',
      value: false,
      // href: link ke layer group
    },
  ]);

  const onClickSidebarHandler = ({ target }) => {
    let nameValue = target.getAttribute('name');

    // get parrent element to make sure clicked element has name attribute
    if (target.getAttribute('element') === 'icon') {
      nameValue = target.parentElement.getAttribute('name');
    }

    // get index of clicked element
    const index = isActive.findIndex((clickedElement) => clickedElement.name === nameValue);
    setIsActive((prevState) => {
      prevState.forEach((element, i) => {
        i === index ? element.value = true : element.value = false;
      });
      return [
        ...prevState,
      ];
    });
  };
  return (
    <section
      className="w-[5%] bg-blue-thin text-white flex flex-col justify-center items-center h-screen gap-5"
    >
      {isActive.map((activeEl) => (
        <button className={`${activeEl.value && 'bg-blue bg-opacity-40'} w-full flex justify-center items-center `} onClick={onClickSidebarHandler} key={activeEl.name} type="button">
          <Link to={activeEl.href} className="w-full flex justify-center items-center" name={activeEl.name}>
            <BsMap className="text-3xl " element="icon" />
          </Link>
        </button>
      ))}
    </section>
  );
}

export default SideBarMapSetting;
