import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // ✅ Make sure to import styled!

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const StyledSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #5a6268;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  onSubmit
}) {
  // Local state for debounced search input
  const [localQueryString, setLocalQueryString] = useState(queryString);

  // Debounce effect - updates parent state after 500ms delay
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={onSubmit}>
      {/* Search */}
      <StyledFormGroup>
        <StyledLabel htmlFor="searchInput">Search todos:</StyledLabel>
        <StyledInput
          type="text"
          id="searchInput"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </StyledFormGroup>

      {/* Sort controls */}
      <StyledFormGroup>
        <StyledLabel htmlFor="sortField">Sort by:</StyledLabel>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
      </StyledFormGroup>

      <StyledFormGroup>
        <StyledLabel htmlFor="sortDirection">Direction:</StyledLabel>
        <StyledSelect
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </StyledFormGroup>
    </StyledForm>
  );
}

export default TodosViewForm;
