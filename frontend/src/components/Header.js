import React from 'react';
import Logo from "../img/logo_pineapple.svg";
import Logo_Mob from "../img/Union.png";
// import Pineapple from "../img/pineapple..png";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className="container">
        <header className="header-flex">
            <h1 className="logo">
                <Link to="/" className="desktop-logo">
                    <img src={Logo} alt="Logo" className="img" />
                </Link>
                <Link to="/" className="mobile-logo">
                    <img src={Logo_Mob} alt="Logo" className="img" />
                </Link>
            </h1>
            <nav className="navigation">
                <ul className="nav-item">
                    <li className="nav-list">
                        <Link to="/#" className="link">
                            About
                        </Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/#" className="link">
                            How it works
                        </Link>
                    </li>
                    <li className="nav-list" >
                        <Link to="/#" className="link">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>        
        </div>
    )
}
