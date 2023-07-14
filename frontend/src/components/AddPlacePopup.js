import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const initialState = { name: '', link: '' };
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState);

    React.useEffect(() => {
        resetForm(initialState, initialState);
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onAddPlace(values);
        }
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} title="Новое место" name="add-card" height="height_l">
            <input id="card-title-input" value={values.name} onChange={handleChange} name="name" type="text" className="form__input" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="form__input-error">{errors.name}</span>
            <input id="card-link-input" value={values.link} onChange={handleChange} name="link" type="url" className="form__input" placeholder="Ссылка на картинку" required />
            <span className="form__input-error">{errors.link}</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;