import React from "react";

const TextInputWithLabel = React.forwardRef(
    ({ elementId, labelText, value, onChange }, ref) => (
        <div className="form-control">
            <label htmlFor={elementId}>{labelText}</label>
            <input id={elementId} ref={ref} type="text" value={value} onChange={onChange} />
        </div>
    )
);

export default TextInputWithLabel;
