import React from 'react';

const TodosViewForm = ({
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    queryString,
    setQueryString,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit}>
            {/* Search */}
            <div className="search-control">
                <label htmlFor="searchInput">Search todos:</label>
                <input
                    type="text"
                    id="searchInput"
                    value={queryString}
                    onChange={(e) => setQueryString(e.target.value)}
                />
                <button type="button" onClick={() => setQueryString('')}>
                    Clear
                </button>
            </div>

            {/* Sort controls */}
            <div className="view-controls">
                <label htmlFor="sortField">Sort by</label>
                <select
                    id="sortField"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </select>

                <label htmlFor="sortDirection">Direction</label>
                <select
                    id="sortDirection"
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </form>
    );
};

export default TodosViewForm;
