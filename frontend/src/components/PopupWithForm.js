import React from "react";

function PopupWithForm({ onSubmit, isOpen, onClose, name, title, buttonText, children, height }) {
    return (
        <div id={`popup-${name}`} className={`popup ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container_${height}`}>
                <button onClick={onClose} className="popup__close-btn" type="button"></button>
                <div className={`popup__content popup__content_${height}`}>
                    <h2 className="popup__title">{title}</h2>
                    <form onSubmit={onSubmit} name={`form-${name}`} className="form" noValidate>
                        {children}
                        <button className={`form__save-btn`} type="submit">{buttonText || 'Сохранить'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;