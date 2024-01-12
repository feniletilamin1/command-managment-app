import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {MessageResponseType } from "../Types/ResponseTypes";
import Cookies from "universal-cookie";
import { useAppDispatch } from "../app/hook";
import { getTeamsAsync } from "../app/slices/teamSlice";
import Preloader from "../Components/Preloader/Preloader";
import Layout from "../Components/Layout/Layout";

export default function InviteTeamPage() {
    const dispatch = useAppDispatch();
    const {token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string| null>(null);
    
    const cookies = new Cookies();
    const email: string = cookies.get("email");

    useEffect( () => {
        if(!token || !email) {
            navigate("404");
            return;
        }
    

        setLoading(true);
        axios.post(process.env.REACT_APP_SERVER_HOST + '/api/Teams/InviteUserToTeam/', token, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function () {
            dispatch(getTeamsAsync());
            navigate("/teams");
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response)
                setError(error.response.data.message)
            else
                setError(error.message);
        })
        .finally(function () {
            setLoading(false);
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            {loading && <Preloader fixed={false} />}
            {error && <p>Ошибка: {error}</p>}
        </Layout>
            
    )
}