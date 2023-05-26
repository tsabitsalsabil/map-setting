import React from 'react';
import { useSelector } from 'react-redux';
import TableWithPagination from '../TableWithPagination';

function BaseMapTable() {
  const { listMap } = useSelector((states) => states);
  const tableColumns = [
    {
      Header: 'Map',
      accessor: 'map',
    },
    {
      Header: 'Source',
      accessor: 'source',
    },
  ];

  return (
    <section>
      <TableWithPagination tableColumns={tableColumns} tableDatas={listMap} headerStyle="bg-[#4893E6] text-white" rowStyle="p-1.5 border-b text-center" />
    </section>
  );
}

export default BaseMapTable;
