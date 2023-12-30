import { UserType } from '../../../Types/ModelsType';
import './TeamUser.css';

type TeamUserProps = {
    user: UserType
}

export default function TeamUser(props: TeamUserProps) {
    const { user } = props;
    
    return (
        <div className="team__member-info">
            <img src={user.photo} alt="Аватар пользователя" className="team__member-avatar"/>
            <div className="team__member-contacts">
                <p className="team__member-text">{`${user.lastName} ${user.firstName} ${user.middleName ? user.middleName : ""}`}</p>
                <a href="mailto:email@.ru" className="team__member-text">email: {user.email}</a>
            </div>
        </div>
    )
}