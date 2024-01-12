import { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import ScrumBoard from "../Components/ScrumBoard/ScrumBoard";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { ScrumBoardType } from "../Types/ScrumBoardTypes";
import Preloader from "../Components/Preloader/Preloader";

export default function ScrumBoardPage() {
    useTitle("WorkFlow - Доска Scrum");

    const navigate = useNavigate();
    const token = useUserCookies();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scrumBoard, setScrumBoard] = useState<ScrumBoardType | null>(null);

    const { projectId } = useParams();

    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
        
        axios.get<ScrumBoardType>(process.env.REACT_APP_SERVER_HOST + '/api/ScrumBoard/GetScrumBoard/'+ projectId, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            setScrumBoard(response.data)
        })
        .catch(function (error: AxiosError) {
            setError(error.message);
            console.log(error);
            navigate("/404");
        })
        .finally (function () {
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout title="Scrum Board">
            {token && loading && !error && <Preloader fixed={false}/>}
            {token && !loading && !error && scrumBoard && <ScrumBoard {...scrumBoard} /> }
        </Layout>   
    )
}