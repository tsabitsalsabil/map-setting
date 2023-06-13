import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';


function BaseMapCategories() {
  const [selectedOption, setSelectedOption] = useState(' ');
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const toggleDropdown =()=>{
    setIsOpen(!isOpen);
  };

  return (
 <div className="relative inline-block w-2/12">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="appearance-none py-2 pl-6 pr-8 bg-white= border border-gray-300 rounded-xl w-full h-12 shadow-md shadow-[rgba(0,0,0,.2)] text-lg font-thin"
        onClick={toggleDropdown}
      >
        <option value="">All categories</option>
        <option value="option1">Map</option>
        <option value="option2">Source</option>
      </select>
      <div className={`text-2xl pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-700 transition-transform duration-150 ${isOpen ? 'transform rotate-180' : ''}`} >
        <span>
          <i><IoIosArrowDown /></i>
        </span>
      </div>
    </div>
  );
}

export default BaseMapCategories;
