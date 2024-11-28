import React from "react";

const Pagination = ({ products, page, setPage, maxVisiblePages = 5 }) => {
  const totalPages = Math.ceil(products.length / 10);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const renderPageKey = (currPage, key) => {
    return (
      <span
        key={key}
        className={page === currPage ? "pagination__selected" : ""}
        onClick={() => selectPageHandler(currPage)}
      >
        {currPage}
      </span>
    );
  };
  const renderPageNumber = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i));
      }
    } else {
      //truncate logic
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));

      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (startPage > 1) {
        if (startPage > 2) {
          pageNumbers.push(renderPageKey(1));
        }
        pageNumbers.push(renderPageKey("...", "ellipsis-start"));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageKey(i));
      }

      if (endPage < totalPages) {
        pageNumbers.push(renderPageKey("...", "ellipsis-end"));
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderPageKey(totalPages));
        }
      }
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      <span
        className={page > 1 ? "" : "pagination__disable"}
        onClick={() => selectPageHandler(page - 1)}
      >
        ◀{" "}
      </span>
      {renderPageNumber()}
      <span
        className={page < products.length / 10 ? "" : "pagination__disable"}
        onClick={() => selectPageHandler(page + 1)}
      >
        {" "}
        ▶
      </span>
    </div>
  );
};

export default Pagination;

// return [...Array(products.length / 10)].map((_, i) => {
//     return (
//       <span
//         key={i}
//         className={page === i + 1 ? "pagination__selected" : ""}
//         onClick={() => selectPageHandler(i + 1)}>
//           {i+1}
//       </span>
//     );
//   });
