import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import InfoTooltip from "./InfoToolltip.js";
import { api } from "../utils/Api";
import { currentUser, CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Register from "./Register.js";
import * as auth from '../utils/auth.js';


function App() {
  const [currentUserState, setCurrentUser] = React.useState(currentUser);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [message, setMessage] = React.useState({ type: '', text: '' });


  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteCardPopupOpen || selectedCard || isInfoTooltipOpen

  const handleRegisterUser = (password, email) => {
    auth.register(password, email)
      .then(res => {
        setMessage({ type: 'success', text: 'Вы успешно зарегистрировались!' });
      }).catch(err => {
        setMessage({ type: 'error', text: 'Что-то пошло не так! Попробуйте ещё раз.' });
      }).finally(() => {
        setInfoTooltipOpen(true);
      });
  }
  
  const handleLoginUser = (password, email) => {
    auth.login(password, email)
      .then(res => {
        setEmail(email);
      }).catch(err => {
        setMessage({ type: 'error', text: 'Что-то пошло не так! Попробуйте ещё раз.' });
        setInfoTooltipOpen(true);
      });
  }

  const handleSignOut = () => {
    auth.logout()
      .then(res => {
        setEmail(null);
      }).catch(err => {
        setMessage({ type: 'error', text: 'Не получилось выйти из профиля' });
      });
  }
  
  React.useEffect(() => {
    auth.validateToken()
      .then((data) => {
        if (data) {
          setEmail(data.data.email);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  React.useEffect(() => {
    Promise.all(
      [api.getUserInfo(),
      api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData?.data);
        setCards(cards?.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleDeleteCardClick = (event) => {
    setDeleteCardPopupOpen(true);
    setSelectedCard({ id: event._id });
  }

  const handleCardClick = (event) => {
    setSelectedCard({
      name: event.target.alt,
      link: event.target.src,
    });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUserState._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => {
        console.error(err);
      })
  }

  const filterCards = (cardId) => {
    const newCards = []
    cards.forEach(c => {
      if (c._id !== cardId) {
        newCards.push(c);
      }
    })
    setCards(newCards)
  }

  const handleCardDelete = (cardId) => {
    setIsLoading(true);
    api.removeCard(cardId)
      .then(_ => {
        filterCards(cardId);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api.updateUserInfo(userInfo)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo?.data);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdateAvatar = (userAvatar) => {
    setIsLoading(true);
    api.updateAvatar(userAvatar)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo?.data);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api.addCard(card)
      .then(newCard => {
        setCards([newCard?.data, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    setMessage({ type: '', text: '' });
  }

  return (
    <CurrentUserContext.Provider value={currentUserState}>
      <BrowserRouter>
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path='/'
            element={<ProtectedRoute
              element={Main}
              loggedIn={email}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />}
          />
          <Route path='/sign-up' element={email ? <Navigate to="/" replace /> : <Register onRegister={handleRegisterUser} name='register' title='Регистрация' buttonText='Зарегистрироваться' />} />
          <Route path='/sign-in' element={email ? <Navigate to="/" replace /> : <Login onLogin={handleLoginUser} name='login' title='Вход' buttonText='Войти' />} />
        </Routes>
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup isLoading={isLoading} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isLoading={isLoading} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <DeleteCardPopup card={selectedCard} onCardDelete={handleCardDelete} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} isLoading={isLoading} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} messageType={message.type} message={message.text} />
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
