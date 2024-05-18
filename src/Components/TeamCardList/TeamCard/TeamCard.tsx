
import { TeamCardType } from '../../../Types/ModelsType';
import './TeamCard.css';

type TeamCardProps = {
    card?: TeamCardType,
    add?: boolean,
}

export default function TeamCard(props: TeamCardProps) {
    const {card, add } = props

    return (
        <div className="team-card">
            {!add && card &&
                <>
                    <h2 className="team-card__name">{card.teamName}</h2>
                    <div className="avatar-list">
                        {card.users.map(user =>
                            <div key={user.id} className="avatar-list__item">
                                <img  src={user.photo} alt="teamUser" className="avatar-list__image"/>
                            </div>
                        )}
                    </div>
                </> 
            }
            {add && 
                <>
                    <div className="team-card__add-wrapper">
                        <button className="team-card__add-btn"></button>
                    </div>
                </>
            }
        </div>
    )
}