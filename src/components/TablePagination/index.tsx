import React from "react";

import "./styles.css";

interface PaginationProps {
    rowsLength: number;
    rowsPerPage: number;
    rowsPage: number;
    handlePageChange: (pageNumber: number, itemsPerPage: number) => void;
}

export function TablePagination({
    rowsLength,
    rowsPerPage,
    rowsPage,
    handlePageChange,
}: PaginationProps) {
    const pageNumbers: any[] = [];
    const pagesShowing: any[] = [];

    for (let i = 1; i <= Math.ceil(rowsLength / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    for (var j = 0; j < pageNumbers.length; j++) {
        var numberPlus = rowsPage === 1 ? 4 : rowsPage === 2 ? 3 : 2;
        var numberMinus =
            rowsPage === pageNumbers.length
                ? 4
                : rowsPage === pageNumbers.length - 1
                ? 3
                : 2;
        if (
            pageNumbers[j] >= rowsPage - numberMinus &&
            pageNumbers[j] <= rowsPage + numberPlus
        ) {
            pagesShowing.push(pageNumbers[j]);
        }
    }

    if (pageNumbers.length <= 0) {
        return <></>;
    }

    return (
        <div className="pagination-bottom-container">
            <div className="pagination-content">
                <button
                    className="button-navigation"
                    onClick={() => handlePageChange(1, rowsPerPage)}
                    disabled={rowsPage === 1}
                >
                    <div className="button-text">Primeira</div>
                </button>
                {pagesShowing.map(
                    (number, index) =>
                        number !== pageNumbers[pageNumbers.length - 1] && (
                            <button
                                className={
                                    rowsPage !== number
                                        ? "button-navigation"
                                        : "button-navigation-active"
                                }
                                key={index}
                                onClick={() =>
                                    handlePageChange(number, rowsPerPage)
                                }
                            >
                                <div className="button-text">{number}</div>
                            </button>
                        )
                )}

                <button
                    className="button-navigation"
                    onClick={() =>
                        handlePageChange(pageNumbers.length - 1, rowsPerPage)
                    }
                    disabled={rowsPage === pageNumbers.length}
                >
                    <div className="button-text">Ultima</div>
                </button>
            </div>
        </div>
    );
}
