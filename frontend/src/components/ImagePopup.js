import React from "react";

function ImagePopup(props) {
    return (
        <div id="popup-view-image" className={`popup popup-img popup_background_dark ${props.card && 'popup_opened'}`}>
            <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
            <img src={props.card?.link} alt={props.card?.name} className="popup-img__image" />
            <h2 className="popup-img__caption">{props.card?.name}</h2>
        </div>
    );
}

export default ImagePopup;