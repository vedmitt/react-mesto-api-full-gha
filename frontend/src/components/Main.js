import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__avatar" src={currentUser?.avatar} alt="Аватар пользователя" />
                    <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                    <h1 className="profile__user-name">{currentUser?.name}</h1>
                    <button onClick={onEditProfile} className="profile__edit-btn" type="button"></button>
                    <p className="profile__user-description">{currentUser?.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-btn" type="button"></button>
            </section>
            <div className="photo-grid" id="photo-grid-container">
                {cards.map(card => (
                    <Card card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onLikeClick={onCardLike}
                        onCardDelete={onCardDelete} />
                ))}
            </div>
        </main>
    );
}


export default Main;