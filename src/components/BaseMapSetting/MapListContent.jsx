import React from 'react';
import BaseMapCategories from './BaseMapCategories';
import BaseMapSearch from './BaseMapSearch';
import BaseMapTable from './BaseMapTable';

function MapListContent({ searchKeywordValue, onSearchKeywordValueChange }) {
  return (
    <div>
      <section className="flex gap-6 mt-10">
        <BaseMapCategories />
        <BaseMapSearch
          searchKeywordValue={searchKeywordValue}
          onSearchKeywordValueChange={onSearchKeywordValueChange}
        />
      </section>
      <section>
        <BaseMapTable />
      </section>
    </div>
  );
}

export default MapListContent;
