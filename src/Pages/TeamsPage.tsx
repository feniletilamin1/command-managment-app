import { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import TeamCardList from "../Components/TeamCardList/TeamCardList";
import { useNavigate } from "react-router-dom";
import Preloader from "../Components/Preloader/Preloader";
import {useAppSelector } from "../app/hook";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";

export default function TeamsPage() {
    useTitle("WorkFlow - Мои команды");

    const {cards, isLoading, Error} = useAppSelector((state) => state.teams);
    
    const navigate = useNavigate();
    const token = useUserCookies();
    
    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Layout title="Мои команды">
            {isLoading && <Preloader fixed={false} />}
            {Error && <p>Ошибка {Error}</p>}
            {!isLoading && !Error && 
                <TeamCardList cards={cards}/>
            }
        </Layout>
    )
}