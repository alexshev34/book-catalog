import React from 'react';
import './Login.css'

const Login = () =>  {
    return(
        <>
            <section className="auth">
                <div className="auth__wrapper">
                    <h2 className="auth__title">Вход</h2>
                    <form className="auth__form">
                        <input className="auth__input" type="text" placeholder="Введите Логин" />
                        <input className="auth__input" type="text" placeholder="Введите пароль" />
                        <button className="auth__button" type="submit">Войти</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;