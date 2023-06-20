/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncDeleteMapListActionCreator,
  editMapListActionCreator,
  changeDeleteModalShowActionCreator,
  changeEditModalShowActionCreator,
  modalEditSuccessToggleActionCreator,
  modalDeleteSuccessToggleActionCreator,
  asyncUpdateMapListActionCreator,
} from '../states';
import PaginationButton from './BaseMapSetting/PaginationButton';
import ModalDelete from './ModalDelete';
import EditModal from './EditModal';
import ModalSuccess from './ModalSuccess';

function TableWithPagination({
  tableColumns = [], tableDatas = [], headerStyle = '', rowStyle,
}) {
  const [mapId, setMapId] = useState(0);
  const dispatch = useDispatch();
  console.log(tableDatas);

  const {
    modals: {
      isDelete: isShowModalDelete, isEdit, isDeleteSuccess, isUpdateSuccess,
    },
  } = useSelector((states) => states);

  const onClickDeleteButton = (MapId) => {
    dispatch(changeDeleteModalShowActionCreator(true));
    setMapId(MapId);
  };

  const onCancelDeleteMapHandler = () => {
    dispatch(changeDeleteModalShowActionCreator(false));
  };

  const onDeleteMapHandler = (id) => {
    dispatch(asyncDeleteMapListActionCreator(id));
    onCancelDeleteMapHandler();
    dispatch(changeDeleteModalShowActionCreator(false));
  };

  const setOnButtonClickEditMapHandler = (editValue) => {
    dispatch(changeEditModalShowActionCreator(editValue));
  };

  const onUpdate = (e, { id, newData }) => {
    e.preventDefault();
    dispatch(asyncUpdateMapListActionCreator(id, {
      ...newData,
      name: newData.title,
    }));
    setOnButtonClickEditMapHandler(false);
  };

  const onClickEditButton = (id) => {
    setOnButtonClickEditMapHandler(true);
    setMapId(id);
  };

  const onClose = () => {
    dispatch(modalDeleteSuccessToggleActionCreator(false));
    dispatch(changeEditModalShowActionCreator(false));
    dispatch(modalEditSuccessToggleActionCreator(false));
  };

  const columns = useMemo(() => [
    {
      Header: 'No',
      Cell: ({ row }) => (
        <h1>{row.index + 1}</h1>
      ),
    },
    ...tableColumns,
    {
      Header: 'Action',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex justify-center items-center text-xl gap-4">
          <button type="button" onClick={() => onClickEditButton(row.original.id)}>
            <MdOutlineEdit />
          </button>
          <button
            type="button"
            onClick={() => {
              onClickDeleteButton(row.original.id);
            }}
          >
            <MdOutlineDeleteForever />
          </button>
        </div>
      ),
    },
  ], []);
  const data = useMemo(() => tableDatas, [tableDatas]);

  const {
    prepareRow,
    headerGroups,
    getTableBodyProps,
    getTableProps,
    pageCount,
    page,
    previousPage,
    gotoPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    state: {
      pageIndex,
      pageSize,
    },
  } = useTable({
    columns,
    data,
  }, useSortBy, usePagination);

  return (
    <div>
      <table {...getTableProps()} className="w-full mt-8 p-2 text-center table-fixed">
        <thead className={`p-4 ${headerStyle}`}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="relative">
                  {column.render('Header')}
                  {(column.Header !== 'No' && column.Header !== 'Action') && <FaSortAlphaDown className="absolute right-10 top-1" />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={`${rowStyle}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-8">
        <h1>{`Showing ${pageIndex * (pageSize + 1)} to ${(pageIndex + 1) * pageSize} of ${pageCount} Entries`}</h1>
        <PaginationButton
          totalPage={10}
          gotoPageFunction={gotoPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          activePage={pageIndex}
        />
      </div>
      <ModalDelete
        isShow={isShowModalDelete}
        id={mapId}
        onDelete={onDeleteMapHandler}
        onCancel={onCancelDeleteMapHandler}
      />
      <EditModal
        isEdit={isEdit}
        onCancel={() => setOnButtonClickEditMapHandler(false)}
        onUpdate={onUpdate}
        mapId={mapId}
      />
      {/* Modal Delete Success */}
      <ModalSuccess isShow={isDeleteSuccess} buttonDescription="OK" messageDescription="Delete Success!" onClose={onClose} />

      {/* Modal Update Success */}
      <ModalSuccess isShow={isUpdateSuccess} buttonDescription="OK" messageDescription="Update Success!" onClose={onClose} />
    </div>
  );
}

export default TableWithPagination;
