import React from 'react';
import { CiSearch } from 'react-icons/ci';

function BaseMapSearch({ searchKeywordValue, onSearchKeywordValueChange }) {
  return (
    <section className="bg-white xl:w-4/12 lg:w-6/12 h-12 flex items-center px-4 rounded-xl border shadow-md shadow-[rgba(0,0,0,.2)] gap-3">
      <label htmlFor="search">
        <CiSearch className="text-2xl" />
      </label>
      <input type="text" id="search" className="border-none outline-none w-full h-full" placeholder="Search Map" value={searchKeywordValue} onChange={onSearchKeywordValueChange} />
    </section>
  );
}

export default BaseMapSearch;
