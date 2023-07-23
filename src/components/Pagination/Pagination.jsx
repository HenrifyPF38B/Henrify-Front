import React from "react";
import style from './Pagination.module.css';


const Pagination = ({ currentPage, lastPage, prevPage, nextPage }) => {
  return (
    <div className={style.pagination}>
      <button className={style.button} onClick={prevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span className={style.number} >
        {currentPage} of {lastPage}
      </span>
      <button className={style.button} onClick={nextPage} disabled={currentPage === lastPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;