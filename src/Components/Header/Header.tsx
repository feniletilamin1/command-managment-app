import './Header.css'
import { useRef } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Menu from './Menu/Menu';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/logo.svg';

export default function Header() {
    const menu = useRef<HTMLDivElement>(null);
    const burgerMenu = useRef<HTMLDivElement>(null);

    const burgerMenuHandler = () => {
        menu.current?.classList.toggle("header__menu-wrapper--active");
        burgerMenu.current?.classList.toggle("burger-menu--active");
    }

    const burgerMenuClose = () => {
        if(menu.current?.classList.contains("header__menu-wrapper--active")) {
            menu.current?.classList.remove("header__menu-wrapper--active");
            burgerMenu.current?.classList.remove("burger-menu--active");
        }
    }

    return(
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="logo">
                        <Link to="/" className="logo__link">
                            <div className="logo__wrapper">
                                <div className="logo-icon">
                                    <Logo />
                                </div>
                                <span className="logo__text">
                                    Work Flow
                                </span>
                            </div>
                        </Link>
                    </div>
                    <BurgerMenu handler={burgerMenuHandler} setRef={burgerMenu}/>
                    <Menu menuCloser={burgerMenuClose} setRef={menu}/>
                </div>
            </div>
        </header>
    )
}