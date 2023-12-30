import './User.css'
import { Link, useNavigate } from "react-router-dom"
import { UserType } from "../../../Types/ModelsType"
import { useAppDispatch } from '../../../app/hook';
import { logOutUser } from "../../../app/slices/userSlice";
import { MouseEvent } from 'react';
import { clearTeams } from '../../../app/slices/teamSlice';

type UserProps = {
    user: UserType | null,
    menuCloser: Function,
}

export default function User(props: UserProps) {
    const { menuCloser, user } = props
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logOuHandler = (e: MouseEvent) => {
        e.preventDefault();
        menuCloser();
        dispatch(clearTeams());
        dispatch(logOutUser());
        navigate("/");
    }
    
    return (
        <div className="header__user">
            {user && 
                <>
                    <Link onClick={() => menuCloser()} className="header-user__link" to="/profile" title="Manage">Привет, {user.firstName}</Link>
                    <button onClick={(e) => logOuHandler(e)} className="header__logout-btn">Выход</button>
                </>
            }
            {!user && 
                <>
                    <Link onClick={() => menuCloser()} to="/login" className="header-user__link">Вход</Link>
                    <Link onClick={() => menuCloser()} to="/register" className="header-user__link">Регистрация</Link>
                </>
            }
        </div>
    )
}