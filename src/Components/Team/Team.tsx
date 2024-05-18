import './Team.css';
import TeamUsersList from './TeamUsersList/TeamUsersList';
import { TeamType } from '../../Types/ModelsType';
import axios, { AxiosError } from 'axios';
import { MessageResponseType } from '../../Types/ResponseTypes';
import { useUserCookies } from '../../hooks/useUserCokies';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTeam } from '../../app/slices/teamSlice';
import Preloader from '../Preloader/Preloader';

type TeamProps = {
    team: TeamType,
}

async function generateInviteLink(token: string, teamId: number):Promise<string> {
    const response = await axios.get<string>(process.env.REACT_APP_SERVER_HOST + `/api/Teams/GetInviteLink/${teamId}`, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const inviteLink: string = `http://localhost:3000/inviteToTeam/${response.data}`;
    return inviteLink;
}

export default function Team (props: TeamProps) {
    const { user } = useAppSelector((state) => state.user);

    const { team } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useUserCookies();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>(null);
    const [inviteLink, setInviteLink] = useState<string | null>(null);

    const getInviteLinkHandler = async () => {
        setInviteLink(await generateInviteLink(token!, team.id));
    }

    const copyInviteLink = async () => {
        await navigator.clipboard.writeText(inviteLink!);
        alert("Скопировано в буфер обмена");
    };

   const deleteTeamHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        axios.delete(process.env.REACT_APP_SERVER_HOST + '/api/Teams/DeleteTeam/' + team.id, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function () {
            dispatch(deleteTeam(team.id))
            navigate("/teams")
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            setError(error.response!.data.message);
        })
        .finally (function () {
            setLoading(false);
        })
    }

    return (
       <>
            {error && <p>Ошибка: {error}</p>}
            {loading && <Preloader fixed={false}/>}
            {!loading && 
                <div className="team">
                    {user && user.id === team.createUserId && 
                        <div className="team__buttons-wrapper">
                            <Link to={`/teams/updateTeam/${team.id}`} className="team__button team__button--blue">Редактировать</Link>
                            <form onSubmit={deleteTeamHandler} className="team__form">
                                <button className="team__button team__button--red">Удалить</button>
                            </form>
                        </div>
                    }
                    <p className="team__description">Описание: {team.teamDescription ? team.teamDescription : "Отсутствует" }</p>
                    {user && user.id === team.createUserId && <button onClick={getInviteLinkHandler} className="team__button team__button--blue">Получить пригласительную ссылку</button>}
                    {inviteLink && <p className="team__invite-link">Пригласительная ссылка: </p> }
                    {inviteLink && <p className="team__invite-link">{inviteLink}</p> }
                    {inviteLink && <button onClick={copyInviteLink} className="team__button team__button--blue">Скопировать</button> }
                    <h2 className="team__members">Состав команды</h2>
                    <TeamUsersList users={team.users}/>
                </div>
            }
       </>
    )
}

