import React from "react";
import ReactPaginate from "react-paginate";

type IPaginate = {
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Paginate = ({ totalCount, page, setPage }: IPaginate) => {
  const handlePageChange = (event: any) => {
    setPage(event.selected);
  };
  if (totalCount < 10) return null;
  return (
    <div className="mt-3">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={Math.ceil(totalCount / 10)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page}
        data-testid="pagination"
      />
    </div>
  );
};

export default Paginate;
