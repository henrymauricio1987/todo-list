import React, { useState } from "react";

function MyForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.email.includes("@")) newErrors.email = "Email inválido";
        if (!formData.message) newErrors.message = "El mensaje no puede estar vacío";
        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Formulario enviado:", formData);
            alert("Formulario enviado con éxito");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            <div>
                <label>Mensaje:</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
                {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default MyForm;