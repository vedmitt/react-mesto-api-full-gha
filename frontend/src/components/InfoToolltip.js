import React from "react";

function InfoTooltip({ isOpen, onClose, messageType, message }) {
    return (
        <div id={"popup-info"} className={`popup ${isOpen && 'popup_opened'}`}>
            <div className={"popup__container popup__container_height_l"}>
                <button onClick={onClose} className="popup__close-btn" type="button"></button>
                <div className={"popup-info popup__content popup__content_height_l"}>
                    <div className={`popup-info__img popup-info__img_${messageType}`}></div>
                    <h2 className="popup-info__title">{message}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;