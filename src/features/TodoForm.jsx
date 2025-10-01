import React, { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    transform: none;
    font-style: italic;
  }
`;

const TodoForm = ({ onAddTodo, isSaving }) => {
    const [todoTitle, setTodoTitle] = useState("");
    const todoTitleInput = useRef(null);

    async function handleAddTodo(event) {
        event.preventDefault();
        if (todoTitle.trim() === "") return;
        await onAddTodo(todoTitle);
        setTodoTitle("");
        todoTitleInput.current.focus();
    }

    return (
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                labelText="Todo"
                ref={todoTitleInput}
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
            />
            <StyledButton type="submit" disabled={todoTitle.trim() === "" || isSaving}>
                {isSaving ? "Saving..." : "Add Todo"}
            </StyledButton>
        </StyledForm>
    );
};

export default TodoForm;
