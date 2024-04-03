import { UserType } from '../../../Types/ModelsType';
import './TeamUser.css';

type TeamUserProps = {
    user: UserType
}

export default function TeamUser(props: TeamUserProps) {
    const { user } = props;
    
    return (
        <div className="team__member-info">
            <div className="team__member-avatar">
                <img src={user.photo} alt="Аватар пользователя" className="team__member-avatar-image"/>
            </div>
            <div className="team__member-contacts">
                <p className="team__member-text">{`${user.lastName} ${user.firstName} ${user.middleName ? user.middleName : ""}`}</p>
                <a href="mailto:email@.ru" className="team__member-text">email: {user.email}</a>
            </div>
        </div>
    )
}