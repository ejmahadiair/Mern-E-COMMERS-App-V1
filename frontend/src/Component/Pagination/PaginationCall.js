import React from "react";
import Pagination from "react-js-pagination";
import "./pagination.scss";
const PaginationCall = ({
  currentPage,
  resultPerPage,
  productsCount,
  setCurrentPageNo,
}) => {
  return (
    <>
      <div className="pagination-container">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </>
  );
};

export default PaginationCall;
