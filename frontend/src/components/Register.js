import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister, name, title, buttonText }) {
    return (
        <div className='auth'>
            <h2 className="popup__title popup__title_theme_dark">{title}</h2>
            <AuthForm onSubmit={onRegister} name={name} buttonText={buttonText} />
            <Link to='/sign-in' className="auth__login-link">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;