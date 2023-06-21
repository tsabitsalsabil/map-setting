import React from 'react';
import NavigationLink from '../NavigationLink';

function AddMapContent({
  title, sourceComponent, subNavOptions, setOptions, onAddHandler,
}) {
  return (
    <article className="xl:w-[30%] lg:w-[40%] mx-auto mt-10">
      <section className="mb-8">
        <NavigationLink options={subNavOptions} setOptions={setOptions} />
      </section>
      <section className="mx-auto bg-white p-10 rounded-xl">
        <h1 className="font-bold text-xl">{title}</h1>
        {sourceComponent}
        <div className="flex justify-end mt-6 gap-3">
          <button
            type="button"
            className="px-5 py-2 border rounded-lg bg-[#1A56DB] text-white"
            onClick={onAddHandler}
          >
            {subNavOptions[0].isActive ? 'Add' : 'Upload'}
          </button>
        </div>
      </section>
    </article>
  );
}

export default AddMapContent;
