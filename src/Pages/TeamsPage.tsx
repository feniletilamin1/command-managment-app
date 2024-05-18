import { FormEvent, useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout/Layout";
import TeamCardList from "../Components/TeamCardList/TeamCardList";
import { useNavigate } from "react-router-dom";
import Preloader from "../Components/Preloader/Preloader";
import {useAppSelector } from "../app/hook";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";
import Search from "../Components/Search/Search";
import { TeamCardType } from "../Types/ModelsType";

export default function TeamsPage() {
    useTitle("WorkFlow - Мои команды");

    const {cards, isLoading, Error} = useAppSelector((state) => state.teams);
    
    const navigate = useNavigate();
    const token = useUserCookies();
    const [filteredTeamCards, setFilteredTeamCards] = useState<TeamCardType[] | null>(null);

    const searchInput = useRef<HTMLInputElement | null>(null);

    const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchText: string = searchInput.current?.value!;

        if(searchText !== "") {
            let newItems: TeamCardType[] = structuredClone(cards);
            newItems = newItems.filter(item => item.teamName.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredTeamCards(newItems);
        }
        else {
            setFilteredTeamCards(null);
        }
    }
    
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
                <>
                    <Search searchInput={searchInput} searchFormHandler={searchFormHandler}/>
                    <TeamCardList cards={filteredTeamCards ? filteredTeamCards : cards}/>
                </>
            }
        </Layout>
    )
}