import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
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

const TextInputWithLabel = React.forwardRef(
    ({ elementId, labelText, value, onChange }, ref) => (
        <StyledDiv>
            <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
            <StyledInput id={elementId} ref={ref} type="text" value={value} onChange={onChange} />
        </StyledDiv>
    )
);

export default TextInputWithLabel;
