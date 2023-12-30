
import './Profile.css'
import { UserType } from "../../Types/ModelsType";

type ProfileProps = {
    user: UserType,
}

export default function Profile(props: ProfileProps) {
    const { user } = props;

    return (
    <div className="profile">
        <img src={user.photo} alt="Фото пользователя" className="profile__avatar"/>
        <div className="profile__details">
            <h2 className="profile__name">{`${user.lastName} ${user.firstName} ${user.middleName ? user.middleName : ""}`}</h2>
            <p className="profile__specialization">Специализация: {user.specialization}</p>
            <p className="profile__email">Email: {user.email}</p>
        </div>
    </div>
    )
}