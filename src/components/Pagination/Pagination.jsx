import React from "react";
import style from './Pagination.module.css';


import back from "../assets/prev.svg";
import next from "../assets/netx.svg";

const Pagination = ({ currentPage, lastPage, prevPage, nextPage }) => {
  return (
    <div className={style.pagination}>
      <button
        className={style.button}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <img className={style.imgpag} src={back} alt="" />
      </button>
      <span className={style.number}>
        {currentPage} of {lastPage}
      </span>
      <button
        className={style.button}
        onClick={nextPage}
        disabled={currentPage === lastPage}
      >
        <img className={style.imgpag} src={next} alt="" />
      </button>
    </div>
  );
};

export default Pagination;