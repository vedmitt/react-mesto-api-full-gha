import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, isLoading, onUpdateAvatar }) {
  const avatarRef = React.useRef('');
  const initialState = { avatar: '' };
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState);

  React.useEffect(() => {
    resetForm(initialState, initialState);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} title="Обновить аватар" name="edit-avatar" height="height_m" >
      <input id="user-avatar-input" ref={avatarRef} value={values.avatar} onChange={handleChange} name="avatar" type="url" className="form__input" placeholder="Ссылка на аватар" required />
      <span className="form__input-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;