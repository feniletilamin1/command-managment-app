import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {MessageResponseType } from "../Types/ResponseTypes";
import { useAppDispatch } from "../app/hook";
import { getTeamsAsync } from "../app/slices/teamSlice";
import Preloader from "../Components/Preloader/Preloader";
import Layout from "../Components/Layout/Layout";
import { useUserCookies } from "../hooks/useUserCokies";

export default function InviteTeamPage() {
    const dispatch = useAppDispatch();
    const { teamToken } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string| null>(null);
    const token = useUserCookies();

    useEffect(() => {
        if(!token) {
            navigate("/login");
        }
        else if(!teamToken) {
            navigate("/404");
        }
        
        axios.get(process.env.REACT_APP_SERVER_HOST + '/api/Teams/InviteUserToTeam/' + teamToken, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function () {
            dispatch(getTeamsAsync());
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            console.log(error);
        })
        .finally(function () {
            setLoading(false);
            navigate("/teams");
            
        })
                
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            {loading && <Preloader fixed={false} />}
        </Layout>
            
    )
}