// /* eslint-disable consistent-return */
// import React from 'react';

// function PaginationButton({
//   gotoPageFunction, canPreviousPage, canNextPage, previousPage, nextPage, activePage, dataLength
// }) {
//   return (
//     <div className="flex  gap-5">
//       <button type="button" disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
//       <div className="flex gap-5">
//         {[1, 2, 3, 4, 5, 6, 7].map((length) => {
//           const pageNumber = length + activePage;
//           return (
//             <button type="button" onClick={() => gotoPageFunction(pageNumber - 1)} key={length} className={`${activePage + 1 === pageNumber && 'bg-blue'} px-2`}>{pageNumber}</button>
//           );
//         })}
//       </div>
//       <button type="button" disabled={!canNextPage} onClick={nextPage}>Next</button>

//     </div>
//   );
// }

// export default PaginationButton;

/* eslint-disable consistent-return */
import React from 'react';

function PaginationButton({
  gotoPageFunction, canPreviousPage, canNextPage, previousPage, nextPage, activePage, dataLength,
}) {
  const totalPages = Math.ceil(dataLength / 10);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + activePage + 1);

  return (
    <div className="flex gap-5">
      <button type="button" disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
      <div className="flex gap-5">
        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            onClick={() => gotoPageFunction(pageNumber - 1)}
            key={pageNumber}
            className={`${pageNumber === activePage + 1 && 'bg-blue'} px-2`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button type="button" disabled={!canNextPage} onClick={nextPage}>Next</button>
    </div>
  );
}

export default PaginationButton;
