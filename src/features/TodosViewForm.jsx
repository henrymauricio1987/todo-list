import React, { useState, useEffect } from "react";

function TodosViewForm({
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    queryString,
    setQueryString,
    onSubmit,
}) {
    const [localQueryString, setLocalQueryString] = useState(queryString);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setQueryString(localQueryString);
        }, 500);

        return () => clearTimeout(debounce);
    }, [localQueryString, setQueryString]);

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="search">Buscar todos:</label>
                <input
                    id="search"
                    type="text"
                    value={localQueryString}
                    onChange={(e) => setLocalQueryString(e.target.value)}
                />
                <button type="button" onClick={() => setLocalQueryString("")}>
                    Borrar
                </button>
            </div>

            <div>
                <label htmlFor="sortField">Ordenar por:</label>
                <select
                    id="sortField"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="createdTime">Fecha de creación</option>
                    <option value="title">Título</option>
                </select>

                <select
                    id="sortDirection"
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value)}
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </form>
    );
}

export default TodosViewForm;
