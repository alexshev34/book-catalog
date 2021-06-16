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
                </div>
            </div>
        </header>
    );
}

export default Header;