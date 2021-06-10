import React from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <NavLink to="/">Главная</NavLink>
                    </div>
                    <nav className="header__menu">
                        <ul className="header__list">
                            <li className="header__item">
                                <NavLink className="header__link" to="/login">Войти</NavLink>
                            </li>
                            <li className="header__item">
                                <NavLink className="header__link" to="/registration">Регистрация</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;