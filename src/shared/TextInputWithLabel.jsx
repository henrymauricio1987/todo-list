import React, { forwardRef } from "react";

const TextInputWithLabel = forwardRef(
    ({ elementId, labelText, value, onChange }, ref) => {
        return (
            <>
                <label htmlFor={elementId}>{labelText}</label>
                <input
                    type="text"
                    id={elementId}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    name="title"
                />
            </>
        );
    }
);

export default TextInputWithLabel;