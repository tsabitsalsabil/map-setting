import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function BaseMapCategories() {
  return (
    <section className="bg-white w-2/12 h-12 flex justify-between items-center px-4 rounded-xl border shadow-md shadow-[rgba(0,0,0,.2)] cursor-pointer">
      <span>All Categories</span>
      <span>
        <IoIosArrowDown />
      </span>
    </section>
  );
}

export default BaseMapCategories;
