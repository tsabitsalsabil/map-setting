import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWithPagination from '../TableWithPagination';
import { asyncGetMaplistActionCreator } from '../../states';

function BaseMapTable() {
  const { listMap, searchedData } = useSelector((states) => states);
  const dispatch = useDispatch();
  const tableColumns = [
    {
      Header: 'Map',
      accessor: 'title',
    },
    {
      Header: 'Source',
      accessor: 'url',
    },
  ];

  useEffect(() => {
    dispatch(asyncGetMaplistActionCreator());
  }, []);
  return (
    <section>
      <TableWithPagination tableColumns={tableColumns} tableDatas={searchedData.length ? searchedData : listMap} headerStyle="bg-[#4893E6] text-white" rowStyle="p-1.5 border-b text-center" />
    </section>
  );
}

export default BaseMapTable;
