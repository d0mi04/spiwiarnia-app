import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if(totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i < totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo; Prev
            </button>

            {pages.map((page) => (
                <button>
                    {page}
                </button>
            ))}

            <button
                onClick={() => currentPage + 1}
                disabled={currentPage === totalPages}
            >
                Next &raquo;
            </button>
        </div>
    );
};

export default Pagination;