import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";
import Layout from "../Components/Layout/Layout";
import UpdateTeamForm from "../Components/TeamForm/UpdateTeamForm";
import { useEffect, useState } from "react";
import { TeamType } from "../Types/ModelsType";
import axios, { AxiosError } from "axios";
import { MessageResponseType } from "../Types/ResponseTypes";
import Preloader from "../Components/Preloader/Preloader";

export default function AddTeamPage() {
    useTitle("WorkFlow - Редактирование команды")

    const [team, setTeam] = useState<TeamType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = useUserCookies();

    const { teamId } = useParams();

     useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }

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
            if(error.response!.data.message === "Wrong team id" || error.response!.data.message === "Access deniend" ) {
                navigate("/404")
                console.log(error.response!.data.message)
            }
                
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
            {error && <p>Ошибка: {error}</p>}
            {token && team &&
                <Layout title="Новая команда">
                    <UpdateTeamForm team={team}/>
                </Layout>
            }
        </>
    )
}