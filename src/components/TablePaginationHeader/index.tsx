import React from "react";

import "./styles.css";

interface TablePaginationProps {
    rowsLength: number;
    rowsPerPage: number;
    onChangeRowsSize: (rowsPerPage: number) => void;
    rowsPage: number;
}

export function TablePaginationHeader({
    rowsLength, //Quantidade de itens no total
    rowsPerPage, //Quantidade de itens por página
    onChangeRowsSize, //Função chamada ao trocar a quantidade de itens da pagina
    rowsPage
}: TablePaginationProps) {
    return (
        <div className="pagination-container">
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                <select value={rowsPerPage} onChange={(e) => onChangeRowsSize(Number(e.target.value))}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
                <div className="sub-title" style={{ marginLeft: 5 }}>
                    resultados por página
                </div>
            </div>
            <div className="sub-title">
                Total {rowsLength}
            </div>
        </div>
    );
}
