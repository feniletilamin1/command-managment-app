import './TeamCardList.css';
import TeamCard from "./TeamCard/TeamCard";
import { TeamCardType } from '../../Types/ModelsType';
import { Link } from 'react-router-dom';

type TeamCardListProps = {
    cards: TeamCardType[]
}

export default function TeamCardList(props: TeamCardListProps) {
    const { cards } = props;

    return (
        <div className="teams">
            {cards.map(item =>
                <Link key={item.id} to={`/teams/team/${item.id}`} className="teams__card-link">
                    <TeamCard card={item}/>
                </Link>
            )}
            <Link to="/teams/newTeam" className="teams__card-link">
                <TeamCard add={true}/>      
            </Link>  
        </div>
    )
}