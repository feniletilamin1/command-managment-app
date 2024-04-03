import User from '../User/User';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import {useAppSelector } from '../../../app/hook';

type MenuProps = {
    setRef: React.LegacyRef<HTMLDivElement>,
    menuCloser: Function,
}

export default function Menu (props: MenuProps) {
    const { menuCloser, setRef } = props;
    const {user} = useAppSelector((state) => state.user);
    
    return (
        <div ref={setRef} className="header__menu-wrapper">
            {user && 
                <nav className="menu">
                    <ul className="menu__list">
                        <li className="menu__list-item">
                            <NavLink onClick={() => menuCloser()} to ="/tasks" className={(navData) => navData.isActive ? "menu__link menu__link--active" : "menu__link"}>Мои задачи</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <NavLink onClick={() => menuCloser()} to ="/teams" className={(navData) => navData.isActive ? "menu__link menu__link--active" : "menu__link"}>Мои команды</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <NavLink onClick={() => menuCloser()} to ="/projects" className={(navData) => navData.isActive ? "menu__link menu__link--active" : "menu__link"}>Проекты</NavLink>
                        </li>
                    </ul>
                </nav>
            }
            <User menuCloser={menuCloser} user={user}/>
        </div>
    )
}