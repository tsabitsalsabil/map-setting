import React from 'react';

function NavigationLink({ options = [], setOptions }) {
  const onClickButtonHandler = ({ target }) => {
    setOptions((prevState) => prevState.map((navLink) => {
      if (navLink.name === target.name) {
        navLink.isActive = true;
      } else {
        navLink.isActive = false;
      }
      return navLink;
    }));
  };

  return (
    <div className="after:contents-[''] after:block after:bg-gray after:h-1 after:w-full">
      <div className="flex w-full justify-center gap-8">
        {options.map((option) => (
          <button
            type="button"
            key={option.name}
            className={`${option.isActive && 'after:block after:h-[3px] after:contents-[""] after:bg-[#4893E6]'}`}
            name={option.name}
            onClick={onClickButtonHandler}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavigationLink;
