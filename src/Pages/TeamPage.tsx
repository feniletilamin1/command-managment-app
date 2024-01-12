import { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import Team from '../Components/Team/Team';
import { useTitle } from '../hooks/useTitle';
import {TeamType } from '../Types/ModelsType';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserCookies } from '../hooks/useUserCokies';
import Preloader from '../Components/Preloader/Preloader';
import { MessageResponseType } from '../Types/ResponseTypes';

export default function TeamPage() {

    useTitle("WorkFlow - Команда");

    const [team, setTeam] = useState<TeamType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = useUserCookies();

    const { teamId } = useParams();
    
    useEffect(() => {
        axios.get<TeamType>(process.env.REACT_APP_SERVER_HOST + `/api/Teams/GetCurrentTeam/${teamId}`, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function (response) {
            setTeam(response.data)
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response!.data.message === "Wrong team id" || error.response!.data.message === "Access deniend" )
                navigate("/404")
            else
                setError(error.message);
        })
        .finally (function () {
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
       <>
        {loading && <Preloader fixed={false} />}
        {!loading && team && 
            <Layout title={`Команда ${team.teamName}`}>
                <Team team={team}/>
            </Layout>
        }
        {error && <p>Ошибка: {error}</p>}
       </>
    )
}