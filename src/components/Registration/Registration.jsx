import React from 'react';
import './Registration.css'

const Registration = () => {
    return(
        <>
            <section className="registration">
                <div className="registration__wrapper">
                    <h2 className="registration__title">Зарегистрироваться</h2>
                    <form className="registration__form">
                        <input className="registration__input" type="text" placeholder="Введите Email:" />
                        <input className="registration__input" type="password" placeholder="Введите пароль:" />
                        <button className="registration__button" type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Registration;