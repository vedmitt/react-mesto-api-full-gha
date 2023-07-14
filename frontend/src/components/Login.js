import React from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin, name, title, buttonText }) {
    return (
        <div className='auth'>
            <h2 className="popup__title popup__title_theme_dark">{title}</h2>
            <AuthForm onSubmit={onLogin} name={name} buttonText={buttonText} />
        </div>
    )
}

export default Login