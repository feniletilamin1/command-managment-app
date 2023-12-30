import { UserType } from "../../../../Types/ModelsType";
import TeamUser from "../../TeamUser/TeamUser";

type TeamUsersListItemProps = {
    user: UserType
}

export default function TeamUsersListItem(props: TeamUsersListItemProps) {
    const { user } = props;

    return (
        <li className="team__member">
            <TeamUser user={user}/>
        </li>
    )
}