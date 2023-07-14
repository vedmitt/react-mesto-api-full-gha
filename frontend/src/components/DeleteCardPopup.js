import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, onCardDelete, isOpen, onClose, isLoading }) {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card.id);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title="Вы уверены?" name="del-card" height="height_s" buttonText={isLoading ? 'Удаление...' : 'Да'} />
    );
}

export default DeleteCardPopup;