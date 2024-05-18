import { FormEvent, useEffect, useRef, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useTitle } from '../hooks/useTitle';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserCookies } from '../hooks/useUserCokies';
import Preloader from '../Components/Preloader/Preloader';
import { MessageResponseType } from '../Types/ResponseTypes';
import { TaskType } from '../Types/ScrumBoardTypes';
import TaskList from '../Components/Tasks/TaskLits';
import Search from '../Components/Search/Search';
import { Link } from 'react-router-dom';

export default function TeamPage() {

    useTitle("WorkFlow - Мои задачи");

    const [tasks, setTaks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[] | null>(null);
    const navigate = useNavigate();

    const searchInput = useRef<HTMLInputElement | null>(null);

    const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchText: string = searchInput.current?.value!;

        if(searchText !== "") {
            let newItems: TaskType[] = structuredClone(tasks);
            newItems = newItems.filter(item => item.content.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredTasks(newItems);
        }
        else {
            setFilteredTasks(null);
        }
    }

    const token = useUserCookies();
    
    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }

        axios.get<TaskType[]>(process.env.REACT_APP_SERVER_HOST + `/api/Projects/GetUserTasks`, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function (response) {
            setTaks(response.data)
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
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
        {!loading && tasks && 
            <Layout title={"Текущие задачи"}>
                <Search searchInput={searchInput} searchFormHandler={searchFormHandler}/>
                <Link to="/archivedTasks" className="scrum-button">Архив задач</Link>
                <TaskList isArchived={false} tasks={filteredTasks ? filteredTasks : tasks} />
            </Layout>
        }
        {error && <p>Ошибка: {error}</p>}
       </>
    )
}