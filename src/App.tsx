import React, { useEffect, useState } from "react";
import { TablePagination } from "./components/TablePagination";
import { TablePaginationHeader } from "./components/TablePaginationHeader";
import { University, Filter } from "./services/classes";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import "./styles.css";

function App() {
    const [loading, setLoading] = useState(false);
    const [universities, setUniversities] = useState<University[]>([]);
    const [filter, setFilter] = useState<Filter>({} as Filter);

    const loadUniversities = async (size: number, offset: number) => {
        try {
            setLoading(true);
            const { items, total } = await University.getAll(size, offset);
            setFilter({ offset, size, total });
            setUniversities(items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemsPerPageChange = (rowsPerPage: number) => {
        loadUniversities(rowsPerPage, 0);
    };

    const handlePageChange = (pageNumber: number, itemsPerPage: number) => {
        loadUniversities(itemsPerPage, pageNumber * itemsPerPage);
    };

    useEffect(() => {
        loadUniversities(15, 0);
    }, []);

    return (
        <div className="container">
            <div className="content-card">
                <TablePaginationHeader
                    rowsPage={
                        filter.offset > 0
                            ? filter.offset / filter.size
                            : filter.offset / filter.size + 1
                    }
                    rowsLength={filter.total}
                    rowsPerPage={filter.size}
                    onChangeRowsSize={(rowsPerPage) =>
                        handleItemsPerPageChange(rowsPerPage)
                    }
                />
                <table className="university-table">
                    <thead>
                        <tr>
                            <th className="university-row">Nome</th>
                            <th className="university-row">Inicial</th>
                            <th className="university-row">Região</th>
                            <th className="university-row">Tipo de região</th>
                            <th className="university-row">Estado</th>
                            <th className="university-row">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            universities.map((university: University) => (
                                <tr key={university.id}>
                                    <td>{university.name}</td>
                                    <td>{university.initial}</td>
                                    <td>{university.region}</td>
                                    <td>{university.regionType}</td>
                                    <td>{university.state}</td>
                                    <td>{university.type}</td>
                                </tr>
                            ))
                        ) : (
                            <div className="loading-container">
                                <Spinner color="white" size={50} />
                            </div>
                        )}
                    </tbody>
                </table>
                <TablePagination
                    rowsLength={filter.total}
                    rowsPerPage={filter.size}
                    rowsPage={
                        filter.offset > 0
                            ? filter.offset / filter.size
                            : filter.offset / filter.size + 1
                    }
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default App;
