import { UserType } from '../../../Types/ModelsType';
import './TeamList.css';
import TeamUsersListItem from "./TeamUsersListItem/TeamUsersListItem";

type TeamUsersListProps = {
    users: UserType[],
}

export default function TeamUsersList(props: TeamUsersListProps) {
    const { users } = props

    return (
        <ul className="team__members-list">
            {users.map(user => 
                <TeamUsersListItem key={user.id} user={user}/>
            )}  
        </ul>
    )
}