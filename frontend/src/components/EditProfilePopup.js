import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const initialState = { name: '', about: '' };
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState);

  React.useEffect(() => {
    resetForm({
      name: currentUser.name,
      about: currentUser.about
    },
      initialState);
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser(values);
    }
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} title="Редактировать профиль" name="edit-profile" height="height_l" >
      <input id="user-name-input" value={values.name} onChange={handleChange} name="name" type="text" className="form__input" placeholder="Имя Фамилия" minLength="2" maxLength="40" required />
      <span className="form__input-error">{errors.name}</span>
      <input id="user-job-input" value={values.about} onChange={handleChange} name="about" type="text" className="form__input" placeholder="О себе" minLength="2" maxLength="200" required />
      <span className="form__input-error">{errors.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;